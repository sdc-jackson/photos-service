const { Sequelize, DataTypes } = require('sequelize');
const db = require('../index.js');

const photos = db.define('photos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  room_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: DataTypes.STRING,
  photo_id: DataTypes.STRING,
  caption: DataTypes.STRING,
  is_primary: DataTypes.BOOLEAN,
  storage_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports.photos = photos;