import scrapy
import requests
from datetime import datetime
from amazonScraper.items import AmazonscraperItem
import json

class AmazonListingSpider(scrapy.Spider):
    name = "amazonlistinglinksrequired"

    def start_requests(self):
        print('====> ', self.links)
        print('====> ', type(self.links))
        links = self.links
        print('====> ', links[0])
        try:
            if links[0] == "'":
                urls = json.load(links)
            if links[0] == '[':
                urls = self.links[1:-1].split(',')
        except:
            urls = []
        print('====> ', urls)
        print('====> ', type(urls))

        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        tr_elems = response.css('#productDetails_feature_div tr')
        print('tr els -> ', tr_elems)
        product_name = response.css('#productTitle::text').extract_first()
        print('tr els -> ', tr_elems)
        price = response.css('#priceblock_ourprice::text').extract_first()

        product = AmazonscraperItem()

        product['specs'] = []

        for tr in tr_elems:
            product['label'] = tr.css('th::text').extract_first().strip()
            product['data'] = tr.css('td::text').extract_first().strip()
            product['specs'].append(data)
            print('specs -> ',tr.css('td::text').extract_first().strip())
        if price:
            product['price'] = price
        if product_name:
            product['productName'] = product_name
        product['scrapeDate'] = str( datetime.now() )

        print(product)
        return product
