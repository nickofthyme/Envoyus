const {
  GraphQLObjectType,
  GraphQLInt
} = require('graphql')

const db = require('db/index.js')

const User = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a User',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(User){
          return User.id;
        }
      }
    }
  }
})
