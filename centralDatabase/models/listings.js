const Sequelize = require('sequelize');

const db = require('../db/index.js');

const Listing = db.define('listing', {
  postingId: Sequelize.STRING,
  postingUrl: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  attributes: Sequelize.STRING,
  location: Sequelize.GEOGRAPHY,
  locAccuracy: Sequelize.STRING,
  // cityName: Sequelize.STRING,
  // lat: Sequelize.DECIMAL,
  // lng: Sequelize.DECIMAL,
  price: Sequelize.DECIMAL,
  priceUnit: Sequelize.STRING,
  imageUrls: Sequelize.ARRAY,
  postDate: Sequelize.DATE,
  updateDate: Sequelize.DATE,
  scrapeDate: Sequelize.DATE,
  dateAddedToDb: Sequelize.NOW,
  processingStatus: Sequelize.STRING,
  specs: Sequelize.ARRAY,
  sellerUrl: Sequelize.STRING,
  // sellerEmail: Sequelize.STRING,
  // sellerName: Sequelize.STRING,
  // sellerPhoneNumber: Sequelize.STRING
});

module.exports = {Listing};
