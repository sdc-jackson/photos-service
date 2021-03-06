const router = require('express').Router();
const controller = require('./controllers');

router.get('/rooms/:id/getPhotosByRoomID', controller.getPhotos);

router.post('/rooms/:id/addPhotosByRoomID', controller.addPhoto);

router.put('/rooms/:id/updatePhotosByRoomID', controller.updatePhoto);

router.delete('/rooms/:id/deletePhotosByRoomID', controller.deletePhoto);

module.exports = router;