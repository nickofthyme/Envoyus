module.exports = {
  APP_NAME: 'envoyus',
  GATEWAY_SERVER: {
    PORT: 3000 || process.env.PORT
  },
  LOGIN_SERVICE: {
    PORT: 3001,
    DB_URI: 'mongodb://localhost/authentication',
  },
  // TODO: this should follow the outline above ^^^
  PRICECHECK_SERVER_PORT: 3002,
  PRICECHECK_SERVER: {
    PORT: 3002
  },
  PRODUCT_SEARCH: {
    PORT: 3015
    // TODO: add postgreSQL uri
    // DB_URI: 'mongodb://localhost/authentication'
  }

}
