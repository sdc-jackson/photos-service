const { Sequelize, DataTypes } = require('sequelize');
const db = require('../index.js');

const Rooms = db.define('rooms', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false
  },
  room_number: Sequelize.INTEGER,
  name: DataTypes.STRING
});

const Photos = db.define('photos', {
  id: {
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

Rooms.hasMany(Photos, {
  foreignKey: 'room_id',
});

Photos.belongsTo(Rooms, {
  onDelete: 'cascade'
});

module.exports.Rooms = Rooms;
module.exports.Photos = Photos;