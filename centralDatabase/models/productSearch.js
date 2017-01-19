const Sequelize = require('sequelize');

const db = require('../db/index.js');

const QueryInfo = db.define('queryInfo', {
  searchQuery: Sequelize.STRING,
  lastSearchDate: Sequelize.DATE,
  lastScrapeDate: Sequelize.DATE
});

const ListingQuery = db.define('listingQuery', {
  searchQuery: Sequelize.STRING,
  lastSearchDate: Sequelize.DATE,
  lastScrapeDate: Sequelize.DATE
});

module.exports = {QueryInfo, ListingQuery};
