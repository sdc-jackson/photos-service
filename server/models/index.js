const { Rooms, Photos } = require('../../database/postgres/models/index.js');

const read = async (params) => {
  return Rooms.findAll({ where: {room_number: params}, include: [Photos]})
    .then(res => res)
    .catch(err => err)
};

const create = (params) => {
  return Photo
    .create(params)
    .then(data => data)
    .catch(err => err)
};

const update = (values, options) => {
  return Photos
    .update(
      options,
      {where: values}
    )
    .then(data => data)
    .catch(err => err)
};

const destroy = (params) => {
  return Photos.destroy({
    where: {
      id: params
    }
  })
    .then(data => data)
    .catch(err => err)
};

module.exports = {read, create, update, destroy};