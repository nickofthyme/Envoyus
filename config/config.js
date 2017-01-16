module.exports = {
  APP_NAME: 'envoyus',
  GATEWAY_SERVER: {
    PORT: 3000 || process.env.PORT
  },
  CENTRAL_DB: {
    DATABASE: 'envoyus_db',
    HOST: 'localhost',
    PORT: 5432
  },
  LOGIN_SERVICE: {
    PORT: 3001,
    DB_URI: 'mongodb://localhost/authentication',
  },
  PRICECHECK_SERVER_PORT: 3002,
  // TODO: this ^^^ should follow the outline below
  PRICECHECK_SERVER: {
    PORT: 3002
  },
  PRODUCT_SEARCH: {
    PORT: 3015
  }
}
