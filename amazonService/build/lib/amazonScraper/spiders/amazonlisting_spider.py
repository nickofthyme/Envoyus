import scrapy
import requests
from datetime import datetime
from amazonScraper.items import AmazonscraperItem

class AmazonListingSpider(scrapy.Spider):
    name = "amazonlisting"

    def start_requests(self):
        headers = {'Content-Type': 'application/graphql'}
        graph_query = """{amazon(query: "%s", SearchIndex: "%s")}""" % ( self.query, self.search_index)
        print(graph_query)
        r = requests.post('http://localhost:3000/graphql', data=graph_query, headers=headers)
        urls = r.json()['data']['amazon']
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        tr_elems = response.css('#productDetails_feature_div tr')
        print('tr els -> ', tr_elems)
        product_name = response.css('#productTitle::text').extract_first()
        print('tr els -> ', tr_elems)
        price = response.css('#priceblock_ourprice::text').extract_first()

        product = AmazonscraperItem()

        specs['specs'] = []

        for tr in tr_elems:
            product['label'] = tr.css('th::text').extract_first().strip()
            product['data'] = tr.css('td::text').extract_first().strip()
            product['specs'].append(data)
        if price:
            product['Price'] = price
        if product_name:
            product['Product Name'] = product_name
        product['scrapeDate'] = str( datetime.now() )

        print(product)
        return product
