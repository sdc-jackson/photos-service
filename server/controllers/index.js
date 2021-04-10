const models = require('../models');
const { v4: uuidv4 } = require('uuid');

const getPhotos = (req, res) => {
  const room_id = req.params.id;
  models.read(room_id)
    .then(photos => res.status(200).send(photos))
    .catch(err => res.status(500).send(err))
};

const addPhoto = (req, res) => {
  models.create(req.body)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(500).send(err))
};

const updatePhoto = (req, res) => {
  const values = { id: req.body.id };
  const options = {
    name: req.body.name,
    caption: req.body.caption,
    is_primary: req.body.is_primary,
    storage_url: req.body.storage_url
  };

  models.update(values, options)
    .then(data => res.status(204).end('Update success'))
    .catch(err => res.status(500).send(err))
};

const deletePhoto = (req, res) => {
  const photo_id = req.body.photo_id;

  models.destroy(photo_id)
    .then(data => res.status(204).end('Deletion success'))
    .catch(err => res.status(500).send(err))
};

module.exports = {getPhotos, addPhoto, updatePhoto, deletePhoto};