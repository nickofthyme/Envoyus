import scrapy
import requests

class AmazonListingSpider(scrapy.Spider):
    name = "amazonlisting"

    def start_requests(self):
        headers = {'Content-Type': 'application/graphql'}
        graph_query = """{amazon(query: "tablet", SearchIndex: "Electronics")}"""
        r = requests.post('http://localhost:3000/graphql', data=graph_query, headers=headers)
        print('HELLOO')
        urls = r.json()['data']['amazon'][:];
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        tr_elems = response.css('#productDetails_feature_div tr')
        product_name = response.css('#productTitle::text').extract_first()
        price = response.css('#priceblock_ourprice::text').extract_first()

        specs = {}
        for tr in tr_elems:
            label = tr.css('th::text').extract_first().strip()
            data = tr.css('td::text').extract_first().strip()
            specs[label] = data
        if price:
            specs['Price'] = price
        if product_name:
            specs['Product Name'] = product_name

        # print(specs)
        return specs
