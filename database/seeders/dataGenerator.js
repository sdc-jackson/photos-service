const faker = require('faker');
const { config } = require('../../config.js');
const { aws: { AWS_URL } } = config;
const fs = require('fs').promises;
const { postgresDB: { db_name, user, pass } } = config;
const { Client } = require('pg')
const client = new Client(db_name, user, pass)

const randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// helper function to generate a CSV row of fake data for DB insertion
const rowGenerator = async (room_id, photoNum, primaryPhoto) => {
  let row = '';
  let room_id_num = room_id;
  let name = await faker.commerce.productAdjective();
  let photo_id = room_id.toString() + photoNum.toString();
  let caption = await faker.commerce.productName();
  let is_primary = primaryPhoto;
  let storage_url = `https://${AWS_URL}/${photoNum}.jpg`;
  let createdAt = await new Date().toISOString();
  let updatedAt = await new Date().toISOString();

  return row += room_id_num + ',' + name + ',' + photo_id + ',' + caption + ',' + is_primary + ',' + storage_url + ',' + createdAt + ',' + updatedAt + '\n';
}

// set CSV headers
let csv = 'room_id,name,photo_id,caption,is_primary,storage_url,createdAt,updatedAt\n';

const csvGenerator = async (recordsPerBatch, recordsToCreate) => {
  await client.connect()
  let photoNum = 1;
  let batchCounter = 0;
  let roomID = 1;

  try {
    // while loop for 10M records
    while (recordsToCreate > 0) {

      // for loop for batch creation and insertion
      for (let i = 0; i < recordsPerBatch; i++) {
        // generate random number between 5 and 10 for number of photos per room ID
        let photosPerRoomID = randomNumberGenerator(5, 10);
        let primaryPhoto = true;

        while (photosPerRoomID > 0) {
          // reset counter if photos is > 1000 (max amount 1000 in AWS S3 bucket);
          if(photoNum > 1000) {
            photoNum = 1;
          }

          // additionally assign next row of generated data to string
          csv += await rowGenerator(roomID, photoNum, primaryPhoto);

          // increment/decrement counters
          photoNum++;
          photosPerRoomID--;
          primaryPhoto = false;
        }

        roomID++;
      }

      batchCounter += recordsPerBatch;
      console.log('batch counter:', batchCounter)

      console.log('writing data batch to hd..')
      await fs.writeFile('database/seeders/seed-data.csv', csv);

      console.log('writing data batch to db..')
      await client
        .query("COPY photos(room_id, name, photo_id, caption, is_primary, storage_url, createdAt, updatedAt) from '/Users/justinr/Desktop/SDC/photos-service/database/seeders/seed-data.csv' WITH (FORMAT csv, HEADER true)")
        .then(result => console.log('seeding...'))
        .catch(e => console.log(e.stack))

      // reset CSV headers for next batch
      csv = 'room_id,name,photo_id,caption,is_primary,storage_url,createdAt,updatedAt\n';
      recordsToCreate -= recordsPerBatch;
      console.log(`${recordsToCreate} records left to create`);
    }
  } catch (e) {
    return console.log(e);
  }
}

module.exports.csvGenerator = csvGenerator;