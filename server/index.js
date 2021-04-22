import express from 'express';
import bodyParser from 'body-parser';
import App from '../client/src/components/App.jsx';
import Html from '../client/src/components/Html.js';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import cors from 'cors';
const path = require('path');

const app = express();
app.use(cors());
const PORT = 5005;

import router from './routes.js';
const postgresDB = require('../database/postgres/index.js');
const { redisClient } = require('../database/redis');
require('newrelic');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/rooms/:id', async (req, res) => {
  const roomId = req.params.id;
  const sheet = new ServerStyleSheet();
  const body = renderToString(sheet.collectStyles(<App roomId={roomId} />));
  const styles = sheet.getStyleTags();
  const title = 'Server Side Rendering Test';
  const script = '/photos-service.js';

  res.send(
    Html({
      body,
      styles,
      title,
      script
    })
  );
});

app.get('/photos-service.js', (req, res) => {
  res.sendFile(path.resolve('./public/photos-service.js'));
})

app.get('/photos-service-ssr.js', (req, res) => {
  res.sendFile(path.resolve('./public/photos-service-ssr.js'));
})

// server routes
app.use('/', router);

// serve the client files
// app.use('/rooms/:id', express.static(__dirname + '/../public'));
// app.use('/', express.static(__dirname + '/../public'));

app.listen(PORT, () => {
  console.log('server started at port: ', PORT);
});