var fs = require('fs');

// run this file using `node pyjsontoelasticjson.js` to ge the JSON file in the below form
// { "index": { "_index": "cl", "_type": "listing" }
// {/* Craigslist Listing data */}
// { "index": { "_index": "cl", "_type": "listing" }
// {/* Craigslist Listing data */}

// see link
// https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html

// filename on root to convert to elasticsearch data
var filename = 'mbp-sfbay'

var json = fs.readFileSync( filename + '.json' );
json = JSON.parse(json.toString());
//{"index":{"_id": String(i)}}) + '\n' +
var newjson = json.map((listing, i) =>
  JSON.stringify({ "index": { "_index": "cl", "_type": "listing" }}) + '\n' + JSON.stringify(listing)).join('\n');

fs.writeFileSync( filename + '-final.json', newjson);

console.log('file ' +  filename + '-final.json has been created');

// run curl with file name in terminal
// curl -s -XPOST http://louispvb.com:9200/_bulk --data-binary @final.json

// curl -s -XPOST http://localhost:9200/_bulk --data-binary @mbp-sfbay-final.json
