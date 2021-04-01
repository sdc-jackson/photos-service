// postgres seeding script
const { Rooms, Photos } = require('../postgres/models/index.js');
const { csvGenerator } = require('./csvDataGenerator.js');

const postgresSeeder = async (recordsToCreate) => {
  const startTime = new Date().getTime();

  try {
    await Rooms.sync({ force: true });
    await Photos.sync({ force: true });
    console.log('The table for the Rooms and Photos model was just (re)created!');

    // batch number variable to create and save (change as desired for performance testing)
    const recordsPerBatch = 2000;

    // load csvGenerator with params; await results
    await csvGenerator(recordsPerBatch, recordsToCreate);

  } catch (e) {
    return console.log(e);
  } finally {
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime);
    console.log(`Execution time: ${executionTime} ms`);
  }
}

// seed 10M records
postgresSeeder(10000000);