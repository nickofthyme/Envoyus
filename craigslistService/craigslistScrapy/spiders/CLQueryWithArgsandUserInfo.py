import scrapy
from datetime import datetime
from craigslistScrapy.items import CraigslistItem

class CraigsListSpider(scrapy.Spider):
    name = 'clquerywithargsuserinfo'

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
            yield scrapy.Request(response.urljoin(href), callback=self.parse_list)

        next_page = response.css('a.button.next::attr(href)').extract_first()

        if next_page is not None:
            next_page = response.urljoin(next_page);
            yield scrapy.Request(next_page, callback=self.parse)


    def parse_list(self, response):
        if 'craigslist.org/search/search/sss?query' in response.request.url:
            # don't parse main listing list page
            return None
        if any(x in response.request.url for x in ['search', '?=s']):
            # don't parse listing list page
            return None
        else:
            def extract_with_css(query):
                return response.css(query).extract_first()

            dateinfo = response.css('.timeago::attr(datetime)').extract()
            updateDate = dateinfo[2] if len(dateinfo) > 2 else ''
            price = extract_with_css('.price::text')

            postDetails = {}

            try:
                postDetails['title'] =  extract_with_css('#titletextonly::text')
            except: postDetails['title'] = None
            try:
                postDetails['price'] = price[1:]
            except: postDetails['price'] = None
            try:
                postDetails['priceUnit'] = price[0]
            except: postDetails['priceUnit'] = None
            try:
                postDetails['cityName'] = extract_with_css('.price+small::text')[2:-1]
            except: postDetails['cityName'] = None
            try:
                postDetails['description'] = extract_with_css('#postingbody')
            except: postDetails['description'] = None
            try:
                postDetails['imageUrls'] = response.css('a.thumb::attr(href)').extract()
            except: postDetails['imageUrls'] = None
            try:
                postDetails['lat'] = extract_with_css('#map::attr(data-latitude)')
            except: postDetails['lat'] = None
            try:
                postDetails['lng'] = extract_with_css('#map::attr(data-longitude)')
            except: postDetails['lng'] = None
            try:
                postDetails['postId'] = extract_with_css('.postinginfos .postinginfo::text')[9:]
            except: postDetails['postId'] = None
            try:
                postDetails['postingUrl'] = response.request.url
            except: postDetails['postingUrl'] = None
            try:
                postDetails['postDate'] = dateinfo[0]
            except: postDetails['postDate'] = None
            try:
                postDetails['updateDate'] = dateinfo[2]
            except: postDetails['updateDate'] = None
            try:
                postDetails['attributes'] = response.css('.attrgroup span').extract()
            except: postDetails['attributes'] = None
            try:
                postDetails['dataMapAccuracy'] =  extract_with_css('#map::attr(data-accuracy)')
            except: postDetails['dataMapAccuracy'] = None

            seller_info = extract_with_css('#replylink::attr(href)')
            if seller_info is not None:
                seller_info_page = response.urljoin(seller_info);
                request = scrapy.Request(seller_info_page, callback=self.extract_final_data)
                request.meta['postDetails'] = postDetails
                request.meta['sellerLink'] = seller_info_page
            else:
                request = None

            return [request]

    def extract_final_data(self, response):
        def extract_with_css(query):
            text = response.css(query).extract_first()
            if text is not None:
                return text.strip()
            return ''

        postDetails = response.meta['postDetails']

        listing = CraigslistItem()

        title = postDetails.get('title')
        price = postDetails.get('price')
        priceUnit = postDetails.get('priceUnit')
        cityName = postDetails.get('cityName')
        description = postDetails.get('description')
        imageUrls = postDetails.get('imageUrls')
        lat = postDetails.get('lat')
        lng = postDetails.get('lng')
        # Get map accuracey
        # Highest => has lat, lng and map marker
        # High => has lat, lng with map circle
        # Medium => has user-defiend city name
        # Low => has none of the above only posting city
        dataMapAccuracy = postDetails.get('dataMapAccuracy')
        try:
            isMapAccurate = int(dataMapAccuracy) < 10
        except:
            isMapAccurate = False
        locAccuracy = 'highest' if all([not(lat is None), not(lng is None), isMapAccurate]) else 'high' if all([not(lat is None), not(lng is None), not isMapAccurate]) else 'medium' if cityName else 'low'
        postId = postDetails.get('postId')
        postingUrl = postDetails.get('postingUrl')
        updateDate = postDetails.get('updateDate')
        attributes = postDetails.get('attributes')
        try:
            sellerUrl = response.meta['sellerLink']
        except: sellerUrl = None
        try:
            sellerName = extract_with_css('aside.reply-flap ul li p::text')
        except: sellerName = None
        try:
            sellerPhoneNumber = extract_with_css('.reply-tel-number::text')[2:]
        except: sellerPhoneNumber = None
        try:
            sellerEmail = extract_with_css('.reply-email-address a::attr(href)')
        except: sellerEmail = None
        try:
            listing['title'] = title
        except: listing['title'] = None
        try:
            listing['price'] = price
        except: listing['price'] = None
        try:
            listing['priceUnit'] = priceUnit
        except: listing['priceUnit'] = None
        try:
            listing['cityName'] = cityName
        except: listing['cityName'] = None
        try:
            listing['description'] = description
        except: listing['description'] = None
        try:
            listing['imageUrls'] = imageUrls
        except: listing['imageUrls'] = None
        try:
            listing['lat'] = lat
        except: listing['lat'] = None
        try:
            listing['lng'] = lng
        except: listing['lng'] = None
        try:
            listing['postId'] = postId
        except: listing['postId'] = None
        try:
            listing['postingUrl'] = postingUrl
        except: listing['postingUrl'] = None
        try:
            listing['updateDate'] = updateDate
        except: listing['updateDate'] = None
        try:
            listing['locAccuracy'] = locAccuracy
        except: listing['locAccuracy'] = None
        try:
            listing['attributes'] = attributes
        except: listing['attributes'] = None
        try:
            listing['sellerUrl'] = sellerUrl
        except: listing['sellerUrl'] = None
        try:
            listing['sellerName'] = sellerName
        except: listing['sellerName'] = None
        try:
            listing['sellerPhoneNumber'] = sellerPhoneNumber
        except: listing['sellerPhoneNumber'] = None
        try:
            listing['sellerEmail'] = sellerEmail
        except: listing['sellerEmail'] = None

        listing['scrapeDate'] = str( datetime.now() )
        listing['specs'] = {} #get specs from amazon
        listing['processingStatus'] = 'fresh' #get specs from amazon

        yield dict(listing)
