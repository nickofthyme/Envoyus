const Sequelize = require('sequelize');

const db = require('../db/index.js');

const Conversation = db.define('listing', {
  postingId: Sequelize.STRING,
  postingUrl: Sequelize.STRING,
});

module.exports = {Conversation};
