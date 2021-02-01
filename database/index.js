const mongoose = require('mongoose');
const { Photo } = require('./schema.js');
const { config } = require('../config.js');

const { db: { host, port, name } } = config;

mongoose.connect(`mongodb://${host}:${port}/${name}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const getPhotosByRoomId = (room_id, cb) => {
  Photo.find({room_id}, (err, photos) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, photos);
    }
  });
}

module.exports.getPhotosByRoomId = getPhotosByRoomId;