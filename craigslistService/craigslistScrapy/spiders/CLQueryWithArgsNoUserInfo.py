import scrapy
from datetime import datetime
from craigslistScrapy.items import CraigslistItem

class CraigsListSpider(scrapy.Spider):
    name = 'clquerywithargsnouserinfo'

    def start_requests(self):
        try:
            try: area = self.search_area
            except: area = 'sfo'
            try:
                if not self.search_subarea.lower() == "none":
                    subarea = str(self.search_subarea) + '/'
                else: subarea = ''
            except: subarea = ''
            try: domain = self.search_domain
            except: domain = 'org'
            try: query = self.search_query
            except: query = 'macbook'
            try: category = self.search_category
            except: category = 'sss'
            try: sort = self.search_sort
            except: sort = 'rel'

            search_url = 'http://%s.craigslist.%s/search/%s%s?query=%s&sort=%s' % (area, domain, subarea, category, query, sort)

            yield scrapy.Request(search_url)
        except:
            print(' ****** Error Loading argumnets  ****** ')
            yield scrapy.Request(None)

    def parse(self, response):
        for href in response.css('.result-row a::attr(href)').extract():
            referral_url = response.request.url

            new_site = response.urljoin(href)
            area = new_site.split('.')[0].split('//')[1]

            if area in referral_url:
                print('--- match --> ', new_site)
                yield scrapy.Request(new_site, callback=self.parse_list)

        next_page = response.css('a.button.next::attr(href)').extract_first()

        if next_page is not None:
            next_page = response.urljoin(next_page);
            yield scrapy.Request(next_page, callback=self.parse)

    def parse_list(self, response):
        if 'craigslist.org/search/search/sss?query' in response.request.url:
            # don't parse main listing list page
            print('----------- No Data to parse Here -----------')
            yield None
        if any(x in response.request.url for x in ['search', '?=s']):
            # don't parse listing list page
            print('----------- No Data to parse Here -----------')
            yield None
        else:
            def extract_with_css(query):
                return response.css(query).extract_first()

            dateinfo = response.css('.timeago::attr(datetime)').extract()
            updateDate = dateinfo[2] if len(dateinfo) > 2 else ''
            price = extract_with_css('.price::text')

            # Create new listing item
            listing = CraigslistItem()

            try:
                listing['title'] = extract_with_css('#titletextonly::text')
            except: listing['title'] = None
            try:
                listing['price'] = price[1:]
            except: listing['price'] = None
            try:
                listing['priceUnit'] = price[0]
            except: listing['priceUnit'] = None
            try:
                cityName = extract_with_css('.price+small::text')[2:-1]
                listing['cityName'] = cityName
            except:
                listing['cityName'] = None
                cityName = None
            try:
                # To get array of all line breaks
                # listing['description'] = response.css('#postingbody::text').extract()
                # To get string of all line breaks
                listing['description'] = ' '.join(response.css('#postingbody::text').extract())
            except: listing['description'] = None
            try:
                listing['imageUrls'] = response.css('a.thumb::attr(href)').extract()
            except: listing['imageUrls'] = None
            try:
                lat = extract_with_css('#map::attr(data-latitude)')
                listing['lat'] = lat
            except:
                listing['lat'] = None
                lat = None
            try:
                lng = extract_with_css('#map::attr(data-longitude)')
                listing['lng'] = lng
            except:
                listing['lng'] = None
                lng = None
            try:
                listing['postId'] = extract_with_css('.postinginfos .postinginfo::text')[9:]
            except: listing['postId'] = None
            try:
                listing['postingUrl'] = response.request.url
            except: listing['postingUrl'] = None
            try:
                listing['postDate'] = dateinfo[0]
            except: listing['postDate'] = None
            try:
                listing['updateDate'] = dateinfo[2]
            except: listing['updateDate'] = None
            try:
                # To get array of all line breaks with html
                # listing['attributes'] = response.css('.attrgroup span').extract()
                # To get string of all line breaks
                listing['attributes'] = ' '.join(response.css('.attrgroup span b::text').extract())
            except: listing['attributes'] = None

            # Get map accuracey
            # Highest => has lat, lng and map marker
            # High => has lat, lng with map circle
            # Medium => has user-defiend city name
            # Low => has none of the above only posting city

            try:
                dataMapAccuracy =  extract_with_css('#map::attr(data-accuracy)')
            except: dataMapAccuracy = None
            try:
                isMapAccurate = int(dataMapAccuracy) < 10
            except:
                isMapAccurate = False

            print('lat = ', lat)
            print('lng = ', lng)
            print('isMapAccurate = ', isMapAccurate)
            print('cityName = ', cityName)
            listing['locAccuracy'] = 'highest' if all([not(lat is None), not(lng is None), isMapAccurate]) else 'high' if all([not(lat is None), not(lng is None), not isMapAccurate]) else 'medium' if cityName else 'low'

            try:
                listing['sellerUrl'] = response.urljoin(extract_with_css('#replylink::attr(href)'))
            except: listing['sellerUrl'] = None

            # Leave all seller info blank
            listing['sellerName'] = None
            listing['sellerPhoneNumber'] = None
            listing['sellerEmail'] = None

            listing['scrapeDate'] = str( datetime.now() )
            listing['specs'] = {} #get specs from amazon
            listing['processingStatus'] = 'fresh' # satus of listing processing

            yield dict(listing)
