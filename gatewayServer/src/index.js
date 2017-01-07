const express = require('express');
const compression = require('compression');
const path = require('path');
const config = require('../../config/config').GATEWAY_SERVER;
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const schema = require('./schema.js');

// TODO ADD GRAPHQL HERE

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '../../client/public')));

var root = {hello: () => 'Hello moto'};

app.use('/graphql', graphqlHTTP({
  schema,
  // rootValue: root,
  graphiql: true
}));

app.listen(config.PORT, () => console.log('Gateway listening on *:' + config.PORT));
