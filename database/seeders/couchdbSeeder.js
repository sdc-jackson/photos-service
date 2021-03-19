const faker = require('faker');
const { config } = require('../../config.js');
const { couchDB: { host, port, db_name, user, pass } } = config;
const nano = require('nano')(`http://${user}:${pass}@${host}:${port}`);
const { aws: { AWS_URL } } = config;
const { randomNumberGenerator } = require('./csvDataGenerator.js');

// helper functions to create data for document insertion
const photoDocGenerator = async (photoNum, primaryPhoto) => {
  return {
    photo_name: await faker.commerce.productAdjective(),
    photo_caption: await faker.commerce.productName(),
    is_primary: primaryPhoto,
    storage_url: `https://${AWS_URL}/${photoNum}.jpg`
  }
};

// function to generate 10M records
const couchdbSeeder = async (recordsToCreate, recordsPerBatch) => {
  const startTime = new Date().getTime();
  console.log(`Seeding ${recordsToCreate} records to CouchDB by batches of ${recordsPerBatch}`);
  let photoNum = 1;
  let roomNumber = 1;

  try {
    await nano.db.destroy(db_name);
    await nano.db.create(db_name);
    console.log('The CouchDB Photos database was just destroyed and (re)created for seeding!');
    const photosDB = nano.use(db_name);

    // while loop for 10M records
    while (recordsToCreate > 0) {
      let batchDocs = [];

      // for loop for batch creation and insertion
      for (let i = 0; i < recordsPerBatch; i++) {
        // generate random number between 5 and 10 for number of photos per room ID
        let photosPerRoomID = randomNumberGenerator(5, 10);
        let primaryPhoto = true;
        let photosData = [];

        // generate multiple photos data per room
        while (photosPerRoomID > 0) {
          if (photoNum > 1000) {
            photoNum = 1;
          }

          photosData.push(await photoDocGenerator(photoNum, primaryPhoto))

          photoNum++;
          photosPerRoomID--;
          primaryPhoto = false;
        }

        // create document for room
        let doc = {
          room_number: roomNumber,
          room_name: await faker.commerce.productAdjective(),
          photos: photosData
        }

        // push document to batch array
        batchDocs.push(doc);
        roomNumber++
      }

      // process batch and save to DB
      await photosDB.bulk({ docs: batchDocs });

      recordsToCreate -= recordsPerBatch;
      console.log(`${recordsToCreate} records left to create...`);
    }
  } catch (e) {
    return console.log(e);
  } finally {
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime);
    console.log(`Execution time: ${executionTime} ms`);
  }
};

couchdbSeeder(10000000, 2000);

