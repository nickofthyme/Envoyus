
const axios = require('axios');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat
} = require('graphql');

/*
"title": "2 x 4GB RAM from MacBook Pro Mid 2012 MacBookPro9,2",
"price": "$40",
"cityName": " (noe valley)",
"description": "<section id=\"postingbody\">\n        <div class=\"print-information print-qrcode-container\">\n            <p class=\"print-qrcode-label\">QR Code Link to This Post</p>\n            <div class=\"print-qrcode\" data-location=\"http://sfbay.craigslist.org/sfc/sop/5935323947.html\"></div>\n        </div>\n2 x 4GB RAM from MacBook Pro Mid 2012 MacBookPro9,2<br>\n<br>\n2 x 4.0GB 1600MHz DDR3L SO-DIMM PC12800 204 Pin<br>\n<br>\nFor Apple MacBook Pro models 2012-current:<br>\nMacBook Pro 13\" 2.5GHz dual-core Intel Core i5<br>\nMacBook Pro 13\" 2.9GHz dual-core Intel Core i7<br>\nMacBook Pro 15\" 2.3GHz quad-core Intel Core i7<br>\nMacBook Pro 15\" 2.6GHz quad-core Intel Core i7<br>\nMacBook Pro 15\" 2.7GHz quad-core Intel Core i7<br>\n<br>\nWorks with Model Identifiers: MacBookPro9,1 &amp; MacBookPro9,2<br>\n<br>\n<br>\n    </section>",
"imageUrls": [
  "https://images.craigslist.org/01212_793uG0K4ZZJ_600x450.jpg",
  "https://images.craigslist.org/00l0l_fWCAT7DEkGD_600x450.jpg"
],
"lat": "37.758700",
"long": "-122.433000",
"postId": "5935323947",
"postingUrl": "http://sfbay.craigslist.org/sfc/sop/5935323947.html",
"postDate": "2016-12-27T17:37:48-0800",
"updateDate": "2017-01-01T21:15:07-0800",
"attributes": [
  "<p class=\"attrgroup\">\n           <span>condition: <b>like new</b></span><br>\n   </p>"
],
"sellerUrl": "http://sfbay.craigslist.org/reply/sfo/sop/5935323947",
"sellerName": "",
"sellerPhoneNumber": "",
"sellerEmail": "",
"specs": []
*/

const ListingType = new GraphQLObjectType({
  name: 'Listing',
  description: 'A representation of elastic search listing',
  fields: () => ({
    description: {
      type: GraphQLString
    },
    title: { type: GraphQLString },
    price: { type: GraphQLString },
    cityName: { type: GraphQLString },
    imageUrls: { type: new GraphQLList(GraphQLString) }, //since it is an array you need to make it a constructo functioin for list and pass it graphqlstrings
    lat: { type: GraphQLString }, //*** may need to be string
    long: { type: GraphQLString },
    postId: { type: GraphQLString },
    postingUrl: { type: GraphQLString },
    postDate: { type: GraphQLString },
    updateDate: {type: GraphQLString },
    attributes: { type: new GraphQLList(GraphQLString) },
    sellerUrl: { type: GraphQLString },
    sellerName: { type: GraphQLString },
    sellerPhoneNumber: { type: GraphQLString },
    sellerEmail: { type: GraphQLString },
    specs: { type: new GraphQLList(GraphQLString) }
  })
});

const HitsMetaData = new GraphQLObjectType({
  name: 'HitsMetaData',
  description: 'Meta data associated with an elastic search',
  fields: () => ({
    total: { type: GraphQLInt },
    maxScore: {type: GraphQLFloat },
    timedOut: {type: GraphQLBoolean }
  })
});

const ListingsHitResult = new GraphQLObjectType({
  name: 'ListingsHitResult',
  description: 'Representaiton of a complete elastic search listing result',
  fields: () => ({
    metaData: {type: HitsMetaData},
    results: {type: new GraphQLList(ListingType)}
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Listings query to search elastic database',
  fields: () => ({
    listings: {
      type: ListingsHitResult,
      description: 'Keyword query to search',
      args: {
        query: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Keywords separated by spaces'
        },
        size: {
          type: GraphQLInt,
          description: 'The number of results to return'
        },
        from: {
          type: GraphQLInt,
          description: 'The starting point of the results to return'
        }
      },
      resolve: async (_, args) => {
        let request;
        try {
          let postReq = {
            'query': {
              'match': {
                'description': args.query
              }
            }
          };
          if (args.size) { postReq.size = args.size; }
          if (args.from) { postReq.from = args.from; }

          request = await axios.post('http://louispvb.com:9200/cl/listing/_search?pretty', postReq);
        } catch(error) {
          console.error(error);
        }
        results = request.data.hits.hits.map(listing => listing._source);
        console.log(request.data);
        let listingsHitResult = {
          metaData: {
            total: request.data.hits.total,
            maxScore: request.data.hits.max_score,
            timedOut: request.data.timed_out
          }, 
          results
        };
        return listingsHitResult;
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: Query
});

module.exports = schema;

