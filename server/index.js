const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const app = express();
const PORT = 5005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static(__dirname + '/../public'));

app.get('/getPhotosByRoomID', (req, res) => {
  db.getPhotosByRoomId(req.query.roomid, (photos) => {
    res.send(photos);
  });
});

app.listen(PORT, () => {
  console.log('server started at port: ', PORT);
});