import scrapy

class CraigsListSpider(scrapy.Spider):
    name = 'cityoncraigslistwithargs'

    start_urls = ['http://sfbay.craigslist.org/search/sss?query=macbook']

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

    postDetails = {
        'title': extract_with_css('#titletextonly::text'),
        'price': extract_with_css('.price::text'),
        'cityName': extract_with_css('.price+small::text'),
        'description': extract_with_css('#postingbody'),
        'imageUrls': response.css('a.thumb::attr(href)').extract(),
        'lat': extract_with_css('#map::attr(data-latitude)'),
        'lng': extract_with_css('#map::attr(data-longitude)'),
        'postId': extract_with_css('.postinginfos .postinginfo::text')[9:],
        'postingUrl': response.request.url,
        'postDate': response.css('.timeago::attr(datetime)').extract()[0],
        'updateDate': response.css('.timeago::attr(datetime)').extract()[2],
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
        'title': postDetails.title,
        'price': postDetails.price,
        'cityName': postDetails.cityName,
        'description': postDetails.description,
        'imageUrls': postDetails.imageUrls,
        'lat': postDetails.lat,
        'long': postDetails.long,
        'postId': postDetails.postId,
        'postingUrl': postDetails.postingUrl,
        'updateDate': postDetails.updateDate,
        'attributes': postDetails.attributes,
        'sellerUrl': response.meta['sellerLink'],
        'sellerName': extract_with_css('aside.reply-flap ul li p::text'),
        'sellerPhoneNumber': extract_with_css('.reply-tel-number::text')[2:],
        'sellerEmail': extract_with_css('.reply-email-address a::attr(href)')
    }]
