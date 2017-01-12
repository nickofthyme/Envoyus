import scrapy

class AmazonscraperItem(scrapy.Item):
    # define all item fields
    title = Field()
    price = Field()
    pass
