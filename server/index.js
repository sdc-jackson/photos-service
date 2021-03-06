const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const app = express();
const PORT = 5005;
const router = require('./routes.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// server routes
app.use('/', router);

// serve the client files
app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));
app.use('/rooms/:id', express.static(__dirname + '/../public'));

app.listen(PORT, () => {
  console.log('server started at port: ', PORT);
});