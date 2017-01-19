const Sequelize = require('sequelize');

const DB_AUTH = require('../../config/config.privatekeys.js').centralDatabase;
const DB_CONFIG = require('../../config/config.js').CENTRAL_DB;


// Database Setup and install Instructions
// =============================================================
// Local install
// `brew install postgres`
// `brew install postgis`
// `postgres -D /usr/local/var/postgres`
// -------------------------------------------------------------
// Docket install
// TODO: Docker install instructions
//
// =============================================================

// Configure database properties
const config = {
  database: DB_CONFIG.DATABASE,
  username: 'blend_admin'|| DB_AUTH.username,
  password: 'jmonlee' || DB_AUTH.password,
  host: DB_CONFIG.HOST,
  port: DB_CONFIG.PORT
}

// set up envoyus PostgresQL database
const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  port: config.port,
  benchmark: false
});

// Check connection to database
db.authenticate()
  .then( (err) => {
    console.log('Connection has been established successfully.');
  })
  .catch( (err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
