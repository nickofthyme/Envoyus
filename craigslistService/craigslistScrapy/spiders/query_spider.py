import scrapy

class CraigsListSpider(scrapy.Spider):
    name = "query"

    start_urls = ['http://sfbay.craigslist.org/search/sss?query=mac&sort=rel']

    def parse(self, response):
        for href in response.css('.box a::attr(href)').extract():
            site_url = response.urljoin(href) + 'search/sss'
            yield scrapy.Request(site_url, callback=self.parse_site)

    def parse_site(self, response):
        for href in response.css('.result-row a::attr(href)').extract():
            yield scrapy.Request(response.urljoin(href), callback=self.parse_list)

        next_page = response.css('a.button.next::attr(href)').extract_first()

        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse_site)

    def parse_list(self, response):
        def extract_with_css(query):
            return response.css(query).extract_first()

        yield {
            'title': extract_with_css('#titletextonly::text'),
            'price': extract_with_css('.price::text'),
            'location': extract_with_css('.price+small:text'),
            'description': extract_with_css('#postingbody::text'),
            'image_urls': response.css('a.thumb::attr(href)').extract(),
            'lat': extract_with_css('#map::attr(data-latitude)'),
            'lng': extract_with_css('#map::attr(data-longitude)'),
            'sellerInfo': {
                'phone_number': extract_with_css('.reply-tel-number::text'),
                'email': extract_with_css('.reply-tel-number::text')
            },
            'postInfo': {
                'id': extract_with_css('.postinginfos .postinginfo::text')[9:],
                'times': response.css('.timeago::attr(datetime)').extract()
            },
            'attributes': response.css('.attrgroup').extract()
        }
