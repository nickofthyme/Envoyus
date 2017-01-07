# -*- coding: utf-8 -*-
import requests

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

elasticEndpoint = 'http://louispvb.com:9200/cl/listing'
# elasticEndpoint = 'http://localhost:9200/test/listing'

class CraigslistsPipeline(object):
    def process_item(self, item, spider):
        r = requests.post(elasticEndpoint, json=item);
        # print('+++++RESPONSE+++++' + r.text)
        return item
