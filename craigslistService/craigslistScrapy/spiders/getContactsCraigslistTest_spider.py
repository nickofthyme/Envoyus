import scrapy

class CraigsListSpider(scrapy.Spider):
    name = 'contactinfo'

    start_urls = ['http://phoenix.craigslist.org/reply/phx/sys/5932228379']

    def parse(self, response):
        yield {
            'name': response.css('aside.reply-flap ul li p::text').extract_first().strip(),
            'phone_number': response.css('.reply-tel-number::text').extract_first().strip()[2:],
            'email': response.css('.reply-email-address a::attr(href)').extract_first()
        }
