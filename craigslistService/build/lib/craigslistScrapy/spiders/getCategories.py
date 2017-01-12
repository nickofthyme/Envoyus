import scrapy

class CraigsListSpider(scrapy.Spider):
    name = 'getcategories'

    start_urls = ['https://www.craigslist.org/about/bulk_posting_interface']

    def parse(self, response):
        cat_table = response.css('.reference_table')[0]
        cat_table_rows = cat_table.css('tr')[1:]

        categories = []

        for category in cat_table_rows:
            category = list(map(lambda sel: sel.css('::text').extract_first(), category.css('td')))
            print('cats',category)
            try:
                categories.append({
                    'fee': category[0],
                    'description': category[1],
                    'type': category[2]
                })
            except: None
        print(categories)
        return list(categories)
