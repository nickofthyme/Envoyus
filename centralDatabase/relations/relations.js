const Sequelize = require('sequelize');
const _ = require('lodash');
const Faker = require('faker');

const db = require('../db/index.js');
const {User} = require('../models/User.js');
const {Listing} = require('../models/Listing.js');
const {PriceHistory, Product} = require('../models/PriceComparison.js');
const {QueryInfo, ListingQuery} = require('../models/ProductSearch.js');
const {Conversation} = require('../models/Conversation.js');

// User relations
User.hasMany(Listing)
User.hasMany(ProductSearch)

// Listings
// Listing.hasMany()
// Listing.hasMany(???)

// PriceComparison
// PriceComparison.hasMany(???)
PriceComparison.hasOne(ProductSearch)

// ProductSearch
ProductSearch.hasMany(Listing)
ProductSearch.hasMany(User)

db.sync( {force: true} ).then( () => {
  _.times(10, () => {
    return User.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    })
  })
})
