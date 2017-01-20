const axios = require('axios');
const {flatten} = require('lodash');
const config = require('../../config/config');
const amazonConfig = require('../../config/config.privatekeys').amazon;
const AmazonSearch = require('./AmazonSearch');
const amazonSearch = new AmazonSearch(amazonConfig);

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

const CLListingType = new GraphQLObjectType({
  name: 'Listing',
  description: 'A representation of elastic search listing',
  fields: () => ({
    postId: { type: GraphQLString },
    postDate: { type: GraphQLString },
    postingUrl: { type: GraphQLString },
    title: { type: GraphQLString },
    price: { type: GraphQLString },
    cityName: { type: GraphQLString },
    imageUrls: { type: new GraphQLList(GraphQLString) }, //since it is an array you need to make it a constructo functioin for list and pass it graphqlstrings
    attributes: { type: new GraphQLList(GraphQLString) },
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
    specs: { type: GraphQLObjectType },
    description: { type: GraphQLString },
    processingStatus: { type: GraphQLString },
    location: { type: GraphQLObjectType },
  })
});

const HitsMetaData = new GraphQLObjectType({
  name: 'HitsMetaData',
  description: 'Meta data associated with a search',
  fields: () => ({
    total: { type: GraphQLInt },
    maxScore: {type: GraphQLFloat },
    timedOut: {type: GraphQLBoolean }
  })
});

const CLListingsHitResult = new GraphQLObjectType({
  name: 'ListingsHitResult',
  description: 'Representaiton of a complete elastic search listing result',
  fields: () => ({
    metaData: {type: HitsMetaData},
    results: {type: new GraphQLList(CLListingType)}
  })
});


const getLookupBounds = (pointLongitude, pointLatitude, MAX_X_DIST_MILES, MAX_Y_DIST_MILES) => {
  // max logitudinal distance from loc (units = miles)
  const MAX_X_DIST = MAX_X_DIST_MILES
  // max latitudinal distance from loc (units = miles)
  const MAX_Y_DIST = MAX_Y_DIST_MILES || MAX_X_DIST;
  // Earth’s mean radius in miles
  const earthRadius = 3959;

  let degrees = (radians) => {
    return (radians * 180) / Math.PI;
  };

  // calculate change in latitude/longitude (degrees) given a max distance (miles)
  let getBounds = (baseDegree, range, tollerance = 1.05) => {
    // set tollerance to % of range to include ( tollerance > 0 )
    let angle = (range * tollerance) / earthRadius;
    let radianChange = 2 * (Math.asin(angle)); // in radians
    let degreeChange = degrees(radianChange) // in degrees
    return {min: baseDegree - degreeChange, max: baseDegree + degreeChange};
  }

  let latitude = getBounds(pointLongitude, MAX_Y_DIST);
  let longitude= getBounds(pointLatitude, MAX_X_DIST);
  return {latitude, longitude};
};



const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query for graphql endpoint',
  fields: () => ({
    proximity: {
      type: CLListingsHitResult,
      description: 'Search database for keyword and range',
      args: {
        query: {
          type: GraphQLString,
          description: 'Searches title for keywords separated by spaces'
        },
        descQuery: {
          type: GraphQLString,
          description: 'Searches description for keywords separated by spaces'
        },
        range: {
          type: GraphQLFloat,
          description: 'The max distance in miles from the users location to listings'
        },
        latitude: {
          type: GraphQLString,
          description: 'The limiting range in miles from the users location to listings  as a string'
        },
        longitude: {
          type: GraphQLString,
          description: 'The limiting range in miles from the users location to listings as a string'
        },
        filterDescription: {
          type: GraphQLString,
          description: 'Keywords from descriptions to filter (remove) from list, separated by spaces'
        },
        filterTitle: {
          type: GraphQLString,
          description: 'Keywords from titles to filter (remove) from list, separated by spaces'
        },
        maxPrice: {
          type: GraphQLFloat,
          description: 'Max price of products'
        },
        minPrice: {
          type: GraphQLFloat,
          description: 'Min price of products'
        },
        maxCondition: {
          type: GraphQLInt,
          description: 'Max condition of products (-5 to 5)'
        },
        minCondition: {
          type: GraphQLInt,
          description: 'Min condition of products (-5 to 5)'
        },
        sortPricePriority: {
          type: GraphQLInt,
          description: 'Set priority from 0 to 100 what the priority of this sort is (100 = highest)'
        },
        sortByImages: {
          type: GraphQLInt,
          description: 'Set priority from 0 to 100 what the priority of this sort is (100 = highest)'
        },
        priceSortOption: {
          type: GraphQLString,
          description: 'Set order of sort (asc, desc, etc.)'
        }
      },
      resolve: async (_, args) => {
        let request;
        try {
          let postReq;
          // Structure query
          let matchObj = {};
          if (args.query) matchObj['title'] = args.query;
          if (args.descQuery) matchObj['description'] = args.descQuery;
          postReq.query.bool = {
            'must': [
              'match': matchObj
            ],
            'must_not': []
          };

          // Structure range of location
          if (args.range && args.latitude && args.longitude) {
            let {latitude, longitude} = getLookupBounds(args.longitude, args.latitude, args.range);
            // Set longitude bounds
            postReq.query.bool.must.push({
              'range': {
                'location.lng': {
                  'gte': longitude.min,
                  'lte': longitude.max,
                  'boost' : 1.05
                }
              }
            });
            // Set latitude bounds
            postReq.query.bool.must.push({
              'range': {
                'location.lat': {
                  'gte': latitude.min,
                  'lte': latitude.max,
                  'boost' : 1.05
                }
              }
            });
          }

          // Structure image filtering
          if (args.sortByImages) {
            postReq.query.bool.must.push({
              'range': {
                'price': {
                  'gte': args.minPrice || null,
                  'lte': args.maxprice || null
                }
              }
            });
          }


            "script" : {
              "script" : "doc['time'].values.length > 1"
            }

          // Structure price filtering
          if (args.minPrice || args.maxprice) {
            postReq.query.bool.must.push({
              'range': {
                'price': {
                  'gte': args.minPrice || null,
                  'lte': args.maxprice || null
                }
              }
            });
          }

          // Structure condition filtering
          if (args.minCondition || args.maxCondition) {
            postReq.query.bool.must.push({
              'range': {
                'Condition': {
                  'gte': args.minCondition || null,
                  'lte': args.maxCondition || null
                }
              }
            });
          }

          // Structure term removal filtering
          if (args.filterDescription || args.filterTitle) {
            if (args.filterTitle) {
              postReq.query.bool.must_not.push({
                "match": {
                  "title": args.filterTitle;
                }
              });
            }
            if (args.filterDescription) {
              postReq.query.bool.must_not.push({
                "match": {
                  "description": args.filterDescription;
                }
              });
            }
          }

          // Structure sorting/order
          if (args.sortByRelevance) {
            let matchObj = {};
            matchObj['title'] = args.query;
          }

          request = await axios.post(config.ELASTIC_SEARCH_URI + '/cl/listing/_search?pretty', postReq);

        } catch(error) {
          console.error('NonFatal: ' + error);
        }
        let results = request.data.hits.hits.map(listing => listing._source);
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
    },
    craigslist: {
      type: CLListingsHitResult,
      description: 'Keyword query to search',
      args: {
        query: {
          type: GraphQLString,
          description: 'Searches title for keywords separated by spaces'
        },
        descQuery: {
          type: GraphQLString,
          description: 'Searches description for keywords separated by spaces'
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
          let matchObj = {};
          if (args.query) matchObj['title'] = args.query;
          if (args.descQuery) matchObj['description'] = args.descQuery;
          let postReq = {
            'query': {
              'match': matchObj
            }
          };
          if (args.size) { postReq.size = args.size; }
          if (args.from) { postReq.from = args.from; }

          request = await axios.post(config.ELASTIC_SEARCH_URI + '/cl/listing/_search?pretty', postReq);
        } catch(error) {
          console.error('NonFatal: ' + error);
        }
        let results = request.data.hits.hits.map(listing => listing._source);
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
    },
    amazon: {
      type: new GraphQLList(GraphQLString),
      description: 'List of amazon products',
      args: {
        query: {
          type: GraphQLString,
          description: 'Keywords to search on Amazon'
        },
        SearchIndex: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The category to search for, see following link for list of categories: http://docs.aws.amazon.com/AWSECommerceService/latest/DG/localevalues.html'
        },
        Brand: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        let allResults = [];
        let requests = [];

        // Batch 10 searches to get 10 amazon result pages
        for (let i = 1; i <= 10; i++) {
          let searchOpts = {
            SearchIndex: args.SearchIndex,
            Keywords: args.query,
            ResponseGroup: 'ItemAttributes',
            ItemPage: i,
          };
          if (args.Brand) searchOpts.brand = args.Brand;
          requests.push(amazonSearch.itemSearch(searchOpts));
        }

        // Execute search requests in parralel
        let datas;
        try {
          datas = await Promise.all(requests);
        } catch (error) {
          console.error('NonFatal: ', error);
        }

        // Return flattened URLS
        return flatten(datas.map(data =>
          data[0].Item.map(item =>
            item.DetailPageURL[0].split('%3FSubscription')[0])));
      }
    }
  })
});

const schema = new GraphQLSchema({ query: Query });

module.exports = schema;
