import express from 'express';
const router = express.Router();
import controller from './controllers';
import { cache } from '../database/redis';

router.get('/rooms/:id/getPhotosByRoomID', cache, controller.getPhotos);

router.post('/rooms/:id/addPhotosByRoomID', controller.addPhoto);

router.put('/rooms/:id/updatePhotoByRoomID', controller.updatePhoto);

router.delete('/rooms/:id/deletePhotoByRoomID', controller.deletePhoto);

export default router;