const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5005;
const router = require('./routes.js');
const postgresDB = require('../database/postgres/index.js');
const { redisClient } = require('../database/redis');
require('newrelic');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// server routes
app.use('/', router);

// serve the client files
app.use('/rooms/:id', express.static(__dirname + '/../public'));
app.use('/', express.static(__dirname + '/../public'));

app.listen(PORT, () => {
  console.log('server started at port: ', PORT);
});