const express = require('express');
const compression = require('compression');
const path = require('path');
const config = require('../../config/config').GATEWAY_SERVER;

// TODO ADD GRAPHQL HERE

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '../../client/public')));

app.listen(config.PORT, () => console.log('Gateway listening on *:' + config.PORT));
