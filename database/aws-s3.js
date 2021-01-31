const { config } = require('../config.js');
const { S3Client, ListBucketsCommand, CreateBucketCommand, PutObjectCommand, DeleteBucketCommand } = require('@aws-sdk/client-s3');
const { aws: { AWS_REGION, AWS_BUCKET_NAME } } = config;

const s3 = new S3Client({ region: process.env.AWS_REGION });

// Get all buckets
const getBuckets = async () => {
  try {
    const bucketList = await s3.send(new ListBucketsCommand({}));
    console.log(bucketList.Buckets);
  } catch(err) {
    console.log(err);
  }
};

// creates a new bucket

const createBucket = async () => {
  const bucketParams = {
    Bucket: AWS_BUCKET_NAME,
    ACL: 'public-read'
  };

  try {
    const newBucket = await s3.send(new CreateBucketCommand(bucketParams));
    console.log('Bucket created succesfully: ', newBucket.Location);
  } catch (err) {
    console.log('Error in creating new bucket: ', err);
  }
}

const deleteBucket = async () => {
  const bucketParams = {
    Bucket: AWS_BUCKET_NAME,
    ACL: 'public-read'
  };

  try {
    const deletedBucket = await s3.send(new DeleteBucketCommand(bucketParams));
    console.log('Bucket deleted succesfully: ');
  } catch (err) {
    console.log('Error in creating new bucket: ', err);
  }
}

// uploads a file to bucket

const uploadFile = async (fileStream, fileName) => {
  let uploadParams = {
    Body: fileStream.data,
    Key: fileName,
    ACL: 'public-read',
    Bucket: AWS_BUCKET_NAME,
    ContentType: 'image/jpeg',
    ContentLength: 38153
  }
  try {
    const uploadedFile = await s3.send(new PutObjectCommand(uploadParams));
    console.log('File uploaded: ', uploadedFile);
    return uploadedFile.Location;
  } catch (err) {
    console.log('Error in file upload: ', err);
  }
}

module.exports = {
  createBucket,
  deleteBucket,
  uploadFile
}


