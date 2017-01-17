const Sequelize = require('sequelize');

const db = require('../db/index.js');

const PriceHistory = db.define('priceHistory', {
  origin: Sequalie.STRING,
  price: Sequalie.DECIMAL,
  link: Sequalie.STRING,
  searchDate: Sequelize.NOW,
  image: Sequelize.STRING,
  productDescription: Sequelize.STRING,
});

const Product = db.define('product', {
  origin: Sequalie.STRING,
  price: Sequalie.DECIMAL,
  link: Sequalie.STRING,
  searchDate: Sequelize.NOW,
  image: Sequelize.STRING,
  productDescription: Sequelize.STRING,
});

module.exports = {PriceHistory, Product};
