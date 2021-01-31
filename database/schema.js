const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
  room_id: String,
  name: String,
  photo_id: String,
  caption: String,
  is_primary: Boolean,
  storage_url: String
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports.Photo = Photo;