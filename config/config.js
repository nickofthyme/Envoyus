module.exports = {
  APP_NAME: 'envoyus',
  GATEWAY_SERVER: {
    PORT: process.env.PORT || 3000
  },
  CENTRAL_DB: {
    DATABASE: 'envoyus_db',
    HOST: '172.17.0.3' || 'localhost',
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
  },
  ELASTIC_SEARCH_URI: 'http://localhost:9200'
}
