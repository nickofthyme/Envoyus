const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');

const app = express();
const pricecheck = express.Router();
const db = mongoose.connection;
const APP_PORT = config.LOGIN_SERVER_PORT;
const config = require('../../config/config');



// MIDDLEWARE INIT
app.use(bodyParser.json());
app.use('/pricecheck', pricecheck);

// ROUTES
pricecheck.route('/amazon')
  .get((req, res) => {
      
  });

app.listen(APP_PORT, () => console.log('Login Service listening on *:' + APP_PORT));
