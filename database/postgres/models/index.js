const { Sequelize, DataTypes } = require('sequelize');
// const db = require('../index.js');
import db from '../index.js';

const Rooms = db.define('rooms', {
  room_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
  },
  room_number: Sequelize.INTEGER,
  name: DataTypes.STRING
});

const Photos = db.define('photos', {
  photo_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
  },
  room_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: DataTypes.STRING,
  caption: DataTypes.STRING,
  is_primary: DataTypes.BOOLEAN,
  storage_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Rooms.removeAttribute('id');
Photos.removeAttribute('id');

Rooms.hasMany(Photos, {
  foreignKey: 'room_id',
});

Photos.belongsTo(Rooms, {
  onDelete: 'cascade',
  foreignKey: 'room_id'
});

export { Rooms, Photos };