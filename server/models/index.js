const { Rooms, Photos } = require('../../database/postgres/models/index.js');
const { redisClient } = require('../../database/redis');
const { v4: uuidv4 } = require('uuid');

const read = (params) => {
  return Rooms.findAll({ where: {room_number: params}, include: [Photos]})
    .then((res) => JSON.stringify(res))
    .then((data) => {
      redisClient.set(params, data);
      return data
    })
    .catch(err => err)
};

const create = (roomNumber, params) => {
  return Rooms
    // find foreign key room_id based on room_number
    .findOne({
      where: {room_number: roomNumber},
      attributes: ['room_id']
    })
    .then((roomData) => {

      const dataToInsert = {
        photo_id: uuidv4(),
        room_id: roomData.room_id, // insert data with foreign key
        name: params.name,
        caption: params.caption,
        is_primary: params.is_primary,
        storage_url: params.storage_url
      }

      return Photos
        .create(dataToInsert)
        .then(data => data)
    })
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