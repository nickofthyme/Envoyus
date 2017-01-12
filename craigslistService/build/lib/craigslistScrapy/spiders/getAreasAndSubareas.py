import scrapy

class CraigsListSpider(scrapy.Spider):
    name = 'getareasandsubareas'

    start_urls = ['https://www.craigslist.org/about/bulk_posting_interface']

    def parse(self, response):
        area_table = response.css('.reference_table')[1]
        area_table_rows = area_table.css('tr')[1:]

        areasAndSubareas = []

        for area in area_table_rows:
            area = list(map(lambda sel: sel.css('::text').extract_first(), area.css('td')))
            print('cats',area)

            try:
                areasAndSubareas.append({
                    'area': area[0],
                    'areaDescription': area[1],
                    'subarea': area[2],
                    'subareaDescription': area[3]
                })
            except: None

        print(areasAndSubareas)
        return list(areasAndSubareas)
