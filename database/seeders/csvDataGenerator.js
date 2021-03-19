const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const { config } = require('../../config.js');
const { aws: { AWS_URL } } = config;
const fs = require('fs').promises;
const { postgresDB: { db_name, user, pass } } = config;
const { Client } = require('pg');
const client = new Client(db_name, user, pass);
const ROOMS_CSV_FILE = 'rooms-seed-data.csv';
const PHOTOS_CSV_FILE = 'photos-seed-data.csv';

const randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// helper function to generate a CSV row of fake data for DB insertion
const roomsRowGenerator = async (roomID, roomNumber) => {
  let row = '';
  let id = roomID;
  let room_number = roomNumber;
  let name = await faker.commerce.productAdjective();
  let created_at = await new Date().toISOString();
  let updated_at = await new Date().toISOString();

  return row += id + ',' + room_number + ',' + name + ',' + created_at + ',' + updated_at + '\n';
}

const photosRowGenerator = async (roomID, photoNum, primaryPhoto) => {
  let row = '';
  let id = uuidv4();
  let room_id = roomID;
  let name = await faker.commerce.productAdjective();
  let caption = await faker.commerce.productName();
  let is_primary = primaryPhoto;
  let storage_url = `https://${AWS_URL}/${photoNum}.jpg`;
  let created_at = await new Date().toISOString();
  let updated_at = await new Date().toISOString();

  return row += id + ',' + room_id + ',' + name + ',' + caption + ',' + is_primary + ',' + storage_url + ',' + created_at + ',' + updated_at + '\n';
}

// define CSV headers
const roomsTableHeaders = 'id, name, created_at, updated_at\n';
const photosTableHeaders = 'id, room_id, name, caption, is_primary, storage_url, created_at, updated_at\n';

// set headers
let roomsCSV = roomsTableHeaders;
let photosCSV = photosTableHeaders;

const csvGenerator = async (recordsPerBatch, recordsToCreate) => {
  await client.connect()
  let photoNum = 1;
  let batchCounter = 0;
  let roomNumber = 1;

  try {
    // while loop for 10M records
    while (recordsToCreate > 0) {

      // for loop for batch creation and insertion
      for (let i = 0; i < recordsPerBatch; i++) {
        // generate random number between 5 and 10 for number of photos per room ID
        let photosPerRoomID = randomNumberGenerator(5, 10);
        // generate UUID for roomID
        let roomID = uuidv4();
        // assign first photo to be primary
        let primaryPhoto = true;

        // generate row data for rooms
        roomsCSV += await roomsRowGenerator(roomID, roomNumber);

        while (photosPerRoomID > 0) {
          // reset counter if photos is > 1000 (max amount 1000 in AWS S3 bucket);
          if(photoNum > 1000) {
            photoNum = 1;
          }

          // assign next row of generated data to CSV string
          photosCSV += await photosRowGenerator(roomID, photoNum, primaryPhoto);

          // increment/decrement counters
          photoNum++;
          photosPerRoomID--;
          primaryPhoto = false;
        }

        roomNumber++;
      }

      batchCounter += recordsPerBatch;
      console.log('batch counter:', batchCounter)

      console.log('writing data batches to hd..')
      await fs.writeFile(`database/seeders/${ROOMS_CSV_FILE}`, roomsCSV);
      await fs.writeFile(`database/seeders/${PHOTOS_CSV_FILE}`, photosCSV);

      console.log('writing data batch to db..')
      await client
        .query("COPY Rooms(id, room_number, name, created_at, updated_at) from '" + __dirname + '/' + ROOMS_CSV_FILE + "' WITH (FORMAT csv, HEADER true)")
        .then(result => console.log('seeding rooms table...'))
        .catch(e => console.log(e.stack))

      await client
        .query("COPY Photos(id, room_id, name, caption, is_primary, storage_url, created_at, updated_at) from '" + __dirname + '/' + PHOTOS_CSV_FILE + "' WITH (FORMAT csv, HEADER true)")
        .then(result => console.log('seeding photos table...'))
        .catch(e => console.log(e.stack))

      // reset CSV headers for next batch
      roomsCSV = roomsTableHeaders;
      photosCSV = photosTableHeaders;
      recordsToCreate -= recordsPerBatch;
      console.log(`${recordsToCreate} records left to create`);
    }
  } catch (e) {
    return console.log(e);
  }
}

module.exports.csvGenerator = csvGenerator;
module.exports.randomNumberGenerator = randomNumberGenerator;