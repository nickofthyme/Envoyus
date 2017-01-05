import scrapy

class CraigsListSpider(scrapy.Spider):
    name = 'cityoncraigslist'

    start_urls = ['http://sfbay.craigslist.org/search/sss?query=macbook+pro+17\"']

    def parse(self, response):
        for href in response.css('.result-row a::attr(href)').extract():
            yield scrapy.Request(response.urljoin(href), callback=self.parse_list)

        next_page = response.css('a.button.next::attr(href)').extract_first()

        if next_page is not None:
            next_page = response.urljoin(next_page);
            yield scrapy.Request(next_page, callback=self.parse)


    def parse_list(self, response):
        def extract_with_css(query):
            return response.css(query).extract_first()

        dateinfo = response.css('.timeago::attr(datetime)').extract()
        updateDate = dateinfo[2] if len(dateinfo) > 2 else ''
        postDetails = {
            'title': extract_with_css('#titletextonly::text'),
            'price': extract_with_css('.price::text'),
            'cityName': extract_with_css('.price+small::text'),
            'description': extract_with_css('#postingbody'),
            'imageUrls': response.css('a.thumb::attr(href)').extract(),
            'lat': extract_with_css('#map::attr(data-latitude)'),
            'long': extract_with_css('#map::attr(data-longitude)'),
            'postId': extract_with_css('.postinginfos .postinginfo::text')[9:],
            'postingUrl': response.request.url,
            'postDate': dateinfo[0],
            'updateDate': updateDate,
            'attributes': response.css('.attrgroup').extract()
        }

        seller_info = extract_with_css('#replylink::attr(href)')
        if seller_info is not None:
            seller_info_page = response.urljoin(seller_info);
            request = scrapy.Request(seller_info_page, callback=self.extract_final_data)
            request.meta['postDetails'] = postDetails
            request.meta['sellerLink'] = seller_info_page

        return [request]

    def extract_final_data(self, response):
        def extract_with_css(query):
            text = response.css(query).extract_first()
            if text is not None:
                return text.strip()
            return ''

        postDetails = response.meta['postDetails']

        return [{
            'title': postDetails.get('title',''),
            'price': postDetails.get('price',''),
            'cityName': postDetails.get('cityName',''),
            'description': postDetails.get('description',''),
            'imageUrls': postDetails.get('imageUrls',''),
            'lat': postDetails.get('lat',''),
            'long': postDetails.get('long',''),
            'postId': postDetails.get('postId',''),
            'postingUrl': postDetails.get('postingUrl',''),
            'postDate': postDetails.get('postDate',''),
            'updateDate': postDetails.get('updateDate',''),
            'attributes': postDetails.get('attributes',''),
            'sellerUrl': response.meta.get('sellerLink',''),
            'sellerName': extract_with_css('aside.reply-flap ul li p::text'),
            'sellerPhoneNumber': extract_with_css('.reply-tel-number::text')[2:],
            'sellerEmail': extract_with_css('.reply-email-address a::attr(href)'),
            'specs': []
        }]
