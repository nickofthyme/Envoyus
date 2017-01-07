require('isomorphic-fetch');
require('es6-promise').polyfill();
const moment = require('moment');
const crypto = require('crypto');
const parseString = require('xml2js').parseString;
const _ = require('lodash');

// EXAMPLE USAGE
// where config has keys {secretKey, accessKey, associateID}

// new AmazonSearch(config)
//   .itemLookup({ItemId: 'B00CPZW2BI'})
//   .then(data => console.log(JSON.stringify(data)));

// new AmazonSearch(config)
//   .similarityLookup({ItemId: 'B00CPZW2BI'})
//   .then(data => console.log(JSON.stringify(data, null, 2)));

class AmazonSearch {
  constructor({secretKey, accessKey, associateID}) {
    this.secretKey = secretKey;
    this.baseURL = 'http://webservices.amazon.com/onca/xml?';
    this.baseOpts = {
      Service: 'AWSECommerceService',
      AWSAccessKeyId: accessKey,
      AssociateTag: associateID,
      // ResponseGroup: 'Images,ItemAttributes',
      // Version: '2013-08-01'
    }
  }
  _generateHmac(data, awsSecretKey, algorithm, encoding) {
    encoding = encoding || "base64";
    algorithm = algorithm || "sha256";
    return crypto.createHmac(algorithm, awsSecretKey).update(data).digest(encoding);
  }
  _getSignature(toSign) {
    return this._generateHmac(toSign, this.secretKey);
  }
  _getTimeStamp() { return moment.utc().format('YYYY-MM-DDTHH:mm:ss')+'Z' }
  _createFullURLString(opts) {
    let fullOpts = _.assign(opts, {
      Timestamp: this._getTimeStamp(),
    });
    let encodedSortedParams = [];
    let sortedKeys = Object.keys(fullOpts).sort();
    sortedKeys.forEach(k => {
      let val = encodeURIComponent(fullOpts[k]);
      let key = encodeURIComponent(k);
      encodedSortedParams.push(`${key}=${val}`);
    });
    encodedSortedParams = encodedSortedParams.join('&');
    let strToSign = 'GET\nwebservices.amazon.com\n/onca/xml\n' + encodedSortedParams;
    let signature = this._getSignature(strToSign);
    let fullURL = this.baseURL
      + encodedSortedParams
      + '&Signature=' + encodeURIComponent(signature);
    return fullURL;
  }

  _fetchData(url) {
    return fetch(url)
      .then(resp => resp.text())
      .then(text => new Promise((resolve, reject) => {
        parseString(text, (err, result) => {
          let lookupError = result['ItemLookupErrorResponse'];
          if (err) reject(err);
          else if (lookupError) reject(JSON.stringify(lookupError, null, 2));
          else resolve(
            _.get(result, 'ItemLookupResponse.Items') ||
            _.get(result, 'SimilarityLookupResponse.Items') ||
            _.get(result, 'ItemSearchResponse.Items') ||
            _.get(result, 'BrowseNodeLookupResponse.BrowseNodes'));
        });
      }));
  }

  _lookupOperation(opts, operation) {
    let lookupOpts = _.assign(this.baseOpts, opts, {
      Operation: operation,
    });
    let url = this._createFullURLString(lookupOpts);
    return this._fetchData(url);
  }

  itemLookup(opts) {
    return this._lookupOperation(opts, 'ItemLookup');
  }

  similarityLookup(opts) {
    return this._lookupOperation(opts, 'SimilarityLookup');
  }

  browseNodeLookup(opts) {
    return this._lookupOperation(opts, 'BrowseNodeLookup');
  }

  itemSearch(opts) {
    if (!opts['SearchIndex'])
      throw 'SearchIndex key is required for item search. See http://docs.aws.amazon.com/AWSECommerceService/latest/DG/localevalues.html';
    return this._lookupOperation(opts, 'ItemSearch');
  }
}

module.exports = AmazonSearch;
