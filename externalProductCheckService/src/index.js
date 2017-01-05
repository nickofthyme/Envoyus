const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pricecheck = express.Router();
const config = require('../../config/config');
const APP_PORT = config.PRICECHECK_SERVER_PORT;
const AmazonSearch = require('./utility/amazonHelper')
const KEYS = require('../../config/config.privatekeys').amazonAuth;
const fs =  require('fs');


// MIDDLEWARE INIT
app.use(bodyParser.json());
app.use('/pricecheck', pricecheck);

// ROUTES
pricecheck.route('/amazon')
  .get((req, res) => {
    new AmazonSearch(KEYS)
    .itemSearch({
      SearchIndex: 'All', 
      Keywords: 'Macbook Pro',
      // BrowseNodes: '13896615011', 
      // ResponseGroup: 'ItemAttributes, BrowseNodeInfo'
      // ResponseGroup: 'BrowseNodes'
      // ResponseGroup: 'ItemIds'
      ResponseGroup: 'ItemAttributes'
      // ResponseGroup: 'ItemAttributes,BrowseNodeInfo,BrowseNodes'
    })
    .then(data => {
      console.log(data);
      var technicalLinks = data[0].Item.map(item => item.ItemLinks[0].ItemLink[0].URL[0])
      // console.log(data[0].Item);
      // console.log(technicalLinks);
      var body = '';
      var filePath = __dirname + '/data.txt';
      body += JSON.stringify(technicalLinks, null, 2);
      fs.writeFile(filePath, body, function() {
        // console.log(JSON.stringify(data, null, 2));
        res.send(JSON.stringify(data, null, 2));
      });
    });
  });
app.listen(APP_PORT, () => console.log('Product Check Service listening on *:' + APP_PORT));
