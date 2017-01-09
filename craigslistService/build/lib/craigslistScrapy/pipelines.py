# -*- coding: utf-8 -*-
import requests

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

# Uncomment to pipe to elasticsearch DB on Louis's server
# elasticEndpoint = 'http://louispvb.com:9200/cl/listing'

# Uncomment to pipe to local elasticsearch DB
# elasticEndpoint = 'http://localhost:9200/test/listing'

class CraigslistsPipeline(object):
    def process_item(self, item, spider):
        # Uncomment to send to either DB
        # r = requests.post(elasticEndpoint, json=item);
        return item
