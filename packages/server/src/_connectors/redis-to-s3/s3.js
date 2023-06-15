const AWS = require("aws-sdk");
const {
  timestamp,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_BUCKET_NAME,
} = require("../mongodb-to-s3/batchUtils");

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});

// Save data to S3 bucket
const saveDataToS3 = async (data) => {
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${timestamp}_batched.json`,
    Body: data,
  };
  console.log("data", data)
  await s3.upload(params).promise();
};

module.exports = saveDataToS3;
