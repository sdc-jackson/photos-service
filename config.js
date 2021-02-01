const dotenv = require('dotenv');
dotenv.config();


const config = {
  app: {
    port: 5005
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'airbnb'
  },
  aws: {
    REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
  }
}

module.exports.config = config;