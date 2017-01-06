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

const ListingType = new GraphQLObjectType({
  name: 'Listing',
  description: 'A representation of elastic search listing',
  fields: () => ({
    description: {
      type: GraphQLString
    }
  })
});

const HitsMetaData = new GraphQLObjectType({
  name: 'Hits Meta Data',
  description: 'Meta data associated with an elastic search',
  fields: () => ({
    total: { type: GraphQLInt },
    maxScore: {type: GraphQLFloat },
    timedOut: {type: GraphQLBoolean }
  })
})

const ListingsHitResult = new GraphQLObjectType({
  name: 'Listings hit result',
  description: 'Representaiton of a complete elastic search listing result',
  fields: () => ({
    metaData: {type: HitsMetaData},
    results: new GraphQLList(ListingType)
  })
})

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
        let result;
        try {
          let postReq = {
            "query": {
              "match": {
                "description": args.query
              }
            }
          };
          if (args.size) { postReq.size = args.size; }
          if (args.from) { postReq.from = args.from; }

          result = await axios.post('http://louispvb.com:9200/cl/listing/_search?pretty', postReq);
        } catch(error) {
          console.error(error);
        }
        result = result.data.hits.hits.map(listing => ({description: listing._source.description}));
        return result;
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: Query
});

module.exports = schema;
