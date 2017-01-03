var fs = require('fs');

var json = fs.readFileSync('sanfranciscoMBP.json');
json = JSON.parse(json.toString());
//{"index":{"_id": String(i)}}) + '\n' +
var newjson = json.map((listing, i) =>
  JSON.stringify({ "index": { "_index": "cl", "_type": "listing" }}) + '\n' + JSON.stringify(listing.postDetails)).join('\n');
fs.writeFileSync('out.json', newjson);
