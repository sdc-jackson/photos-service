const { uploadFile }  = require('./aws-s3.js');
const { getRandomImage } = require('./fileHelper.js');

//seeding script for generation and uploading photos to AWS s3 bucket
const s3seeder = async (startingRecord, nRecords) => {
  let startTime = new Date().getTime();

  for (let i = startingRecord; i <= nRecords; i++) {
    let imageStream = await getRandomImage();
    let uploadURL = await uploadFile(imageStream, i.toString());

    console.log(`saved photo ${i} in s3 bucket at ${uploadURL}`);
  }

  let endTime = new Date().getTime();
  let executionTime = (endTime - startTime);
  console.log(`Execution time: ${executionTime} ms`);
}

s3seeder(1, 1000);
