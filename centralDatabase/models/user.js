const Sequelize = require('sequelize');

const db = require('../db/index.js');

const User = db.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  userId: Sequalize.UUIDV4, // may not need use fb auth user id
  facebookId: Sequelize.DECIMAL // may no need
  email: {
    type: Sequalize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
  }
});

module.exports = User;
