const db = require('../index.js');

test('should return data for a valid room id', () => {
  db.getPhotosByRoomId('100', (photos) => {
    expect(photos.length).toBe(0);
  })

});