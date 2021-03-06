const { Photo } = require('../../database/schema.js');

const read = (params) => {
  return Photo
    .find(params)
    .exec()
    .then(photos => photos)
    .catch(err => err)
};

const create = () => {};

const update = () => {};

const destroy = (params) => {
  return Photo
    .deleteOne(params)
    .exec()
    .then(data => data)
    .catch(err => err)
};

module.exports = {read, create, update, destroy};