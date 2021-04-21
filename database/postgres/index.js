const { Sequelize } = require('sequelize');
import { config } from '../../config.js';
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
const login = `postgres://${user}:${pass}@${host}:5432/${db_name}`;
const db = new Sequelize(login, pgConfig);

(async () => {
  try {
    await db.authenticate();
    console.log('Postgres connection has been established successfully.');
  } catch (error) {
    console.error(error, '\nUnable to connect to the database\n');
  }
})();

export default db;