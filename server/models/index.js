const { Photo } = require('../../database/schema.js');

const read = (params) => {
  return Photo
    .find(params)
    .exec()
    .then(photos => photos)
    .catch(err => err)
};

const create = (params) => {
  return Photo
    .create(params)
    .then(data => data)
    .catch(err => err)
};

const update = (conditions, update) => {
  const options = {
    new: true
  }

  return Photo
    .findOneAndUpdate(conditions, update, options)
    .exec()
    .then(data => data)
    .catch(err => err)
};

const destroy = (params) => {
  return Photo
    .deleteOne(params)
    .exec()
    .then(data => data)
    .catch(err => err)
};

module.exports = {read, create, update, destroy};