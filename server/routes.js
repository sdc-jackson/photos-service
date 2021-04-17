const router = require('express').Router();
const controller = require('./controllers');
const { cache } = require('../database/redis');

router.get('/rooms/:id/getPhotosByRoomID', cache, controller.getPhotos);

router.post('/rooms/:id/addPhotosByRoomID', controller.addPhoto);

router.put('/rooms/:id/updatePhotoByRoomID', controller.updatePhoto);

router.delete('/rooms/:id/deletePhotoByRoomID', controller.deletePhoto);

module.exports = router;