const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLChar,
  GraphQLDecimal,
  GraphQLBoolean,
  GraphQLDate,
  GraphQLFloat
} = require('graphql');

const db = require('db/index.js')

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(User){
          return User.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(User){
          return User.name;
        }
      },
      token: {
        type: GraphQLInt,
        resolve(User){
          return User.token;
        }
      },
      facebookId: {
        type: GraphQLInt,
        resolve(User){
          return User.facebookId;
        }
      },
      email: {
        type: GraphQLString,
        resolve(User){
          return User.email;
        }
      }
    }
  }
});

const Listing = new GraphQLObjectType({
  name: 'Listing',
  description: 'This represents a CL Listing',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(Listing){
          return Listing.id;
        }
      },
      postingId: {
        type: GraphQLInt,
        resolve(Listing){
          return Listing.postingId;
        }
      },
      postingUrl: {
        type: GraphQLString,
        resolve(Listing){
          return Listing.postingUrl;
        }
      },
      title: {
        type: GraphQLString,
        resolve(Listing){
          return Listing.title;
        }
      },
      description: {
        type: GraphQLString,
        resolve(Listing){
          return Listing.description;
        }
      },
      attributes: {
        type: GraphQLList(GraphQLString),
        resolve(Listing){
          return Listing.attributes;
        }
      },
      location: {
        type: GraphQLXXX,
        resolve(Listing){
          return Listing.location;
        }
      },
      locAccuracy: {
        type: GraphQLString,
        resolve(Listing){
          return Listing.locAccuracy;
        }
      },
      price: {
        type: GraphQLDecimal,
        resolve(Listing){
          return Listing.price;
        }
      },
      priceUnit: {
        type: GraphQLChar,
        resolve(Listing){
          return Listing.priceUnit;
        }
      },
      imageUrls: {
        type: GraphQLList(GraphQLString),
        resolve(Listing){
          return Listing.imageUrls;
        }
      },
      postDate: {
        type: GraphQLDate,
        resolve(Listing){
          return Listing.postDate;
        }
      },
      updateDate: {
        type: GraphQLDate,
        resolve(Listing){
          return Listing.updateDate;
        }
      },
      scrapeDate: {
        type: GraphQLDate,
        resolve(Listing){
          return Listing.scrapeDate;
        }
      },
      dateAddedToDb: {
        type: GraphQLDate,
        resolve(Listing){
          return Listing.dateAddedToDb;
        }
      },
      processingStatus: {
        type: GraphQLString,
        resolve(Listing){
          return Listing.processingStatus;
        }
      },
      specs: {
        type: GraphQLList(GraphQLString),
        resolve(Listing){
          return Listing.specs;
        }
      },
      sellerUrl: {
        type: GraphQLString,
        resolve(Listing){
          return Listing.sellerUrl;
        }
      }
    }
  }
});


const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      user: {
        type: new GraphQLList(User),
        resolve(user, args) {
          return db.models.User.finalAll( {where: args} )
        }
      }
    }
  }
})
