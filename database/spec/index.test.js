const db = require('../index.js');

test('should return data for a valid room id', async () => {
  const data = await db.getPhotosByRoomId('100');
  expect(photos.length).toBe(10);
});