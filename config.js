const config = {
  app: {
    port: 5005
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'airbnb'
  },
  postgresDB: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    db_name: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    pass: process.env.POSTGRES_PW
  },
  couchDB:{
    host: '127.0.0.1',
    port: 5984,
    db_name: 'sdc_photos',
    user: process.env.COUCHDB_USER,
    pass: process.env.COUCHDB_PW
  },
  aws: {
    REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_URL: process.env.AWS_URL
  }
}

module.exports.config = config;