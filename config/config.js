module.exports = {
  APP_NAME: 'envoyus',
  GATEWAY_SERVER: {
    PORT: 3000 || process.env.PORT
  },
  LOGIN_SERVICE: {
    PORT: 3001,
    DB_URI: 'mongodb://localhost/authentication',
  },
  PRICECHECK_SERVER_PORT: 3002,
}
