const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/airbnb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const Photo = mongoose.model('Photo', {
  room_id: String,
  name: String,
  photo_id: String,
  caption: String,
  is_primary: Boolean,
  storage_url: String
});

const getPhotosByRoomId = (room_id, cb) => {
  Photo.find({room_id}, (err, photos) => {
    cb(photos);
  });
}

module.exports.getPhotosByRoomId = getPhotosByRoomId;