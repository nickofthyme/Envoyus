const Sequelize = require('sequelize');

const db = require('../db/index.js');

const User = db.define('user', {
  name: Sequelize.STRING,
  token: Sequelize.STRING,
  facebookId: Sequelize.DECIMAL,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

module.exports = User;
