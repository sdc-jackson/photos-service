const { Rooms, Photos } = require('../../database/postgres/models/index.js');

const read = (params) => {
  return Rooms.findAll({ where: {room_number: params}, include: [Photos]})
    .then(res => res)
    .catch(err => err)
};

const create = (params) => {
  return Rooms
    // find foreign key room_id based on room_number
    .findOne({
      where: {room_number: params.room_number},
      attributes: ['room_id']
    })
    .then((roomData) => {

      const dataToInsert = {
        photo_id: params.photo_id,
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