const { Sequelize } = require('sequelize');
const { config } = require('../../config.js');
const { postgresDB: { host, db_name, user, pass } } = config;

const pgConfig = {
  "define": {
    "createdAt": "created_at",
    "updatedAt": "updated_at",
  },
  logging: false,
  host: host,
  dialect: 'postgres',
}

const db = new Sequelize(db_name, user, pass, pgConfig);

(async () => {
  try {
    await db.authenticate();
    console.log('Postgres connection has been established successfully.');
  } catch (error) {
    console.error(error, '\nUnable to connect to the database\n');
  }
})();

module.exports = db;