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

Photo.deleteMany({}).then(() => {
  console.log('deleted all photos..');
  for (let i = 100; i < 200; i++) {
    let isPrimary = true;
    for (let j = 100; j < 110; j++) {
      let propertyPhoto = new Photo({
        room_id: i,
        name: 'bedroom' + j,
        photo_id: i.toString() + j.toString(),
        caption: j + 'cozy' + i,
        is_primary: isPrimary,
        storage_url: ''
      });
      propertyPhoto.save().then(() => {
        console.log('saved in db..');
      });
      isPrimary = false;
    }
  }
});

module.exports.Photo = Photo;
