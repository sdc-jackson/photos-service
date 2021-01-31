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
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME
  }
}

module.exports.config = config;