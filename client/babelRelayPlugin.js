var babelRelayPlugin   = require('babel-relay-plugin');
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var request            = require('sync-request');

var graphqlHubUrl = 'http://localhost:3000/graphql';
var response = request('GET', graphqlHubUrl, {
  qs: {
    query: introspectionQuery
  }
});

var schema = JSON.parse(response.body.toString('utf-8'));

console.log('DATA', JSON.stringify(schema.data, null, 2))
module.exports = babelRelayPlugin(schema.data);