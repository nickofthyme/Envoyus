from scrapy import Field, Item

class AmazonscraperItem(Item):
    # define all item fields
    price = Field()
    productName = Field()
    specs = Field()
    scrapeDate = Field()
