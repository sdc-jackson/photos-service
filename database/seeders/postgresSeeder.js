// postgres seeding script
const { photos } = require('../postgres/models/index.js');
const { csvGenerator } = require('./dataGenerator.js');

const postgresSeeder = async (recordsToCreate) => {
  let startTime = new Date().getTime();
  try {
    await photos.drop();
    console.log('Starting new Postgres seeding session. Photos table dropped!')
    await photos.sync({ force: true });
    console.log('The table for the photos model was just (re)created!');

    // batch number variable to create and save (change as desired for performance testing)
    let recordsPerBatch = 100000;

    // load csvGenerator with params; await results
    await csvGenerator(recordsPerBatch, recordsToCreate);

  } catch (e) {
    return console.log(e);
  } finally {
    let endTime = new Date().getTime();
    let executionTime = (endTime - startTime);
    console.log(`Execution time: ${executionTime} ms`);
  }
}

// seed 10M records
postgresSeeder(10000000);