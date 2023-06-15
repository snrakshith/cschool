const { Kafka } = require('kafkajs');
const storeDataInRedis = require('./redis');
const saveDataToS3 = require('./s3');
const getDataFromRedis = require('./redis');

const AWS = require("aws-sdk");
const { timestamp,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_BUCKET_NAME, } = require('../mongodb-to-s3/batchUtils');

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});



// Create a Kafka client
const kafka = new Kafka({
  clientId: "demo_poc",
  brokers: ["localhost:9092"], // Add your Kafka broker addresses
});



const runConsumer = async () => {
  try {
    const consumer = kafka.consumer({ groupId: "my-group", retry: { retries: 5 } })
    await consumer.connect()
    await consumer.subscribe({ topic: 'tutorialspedia', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // Process the data here
        const data = message.value.toString();

        // Assuming you have a variable 'binData' containing the binary data
        const binData = message.value; // Your binary data

        // Convert binData to a Buffer
        const buffer = Buffer.from(binData, 'binary');

        // Convert the Buffer to a string
        const bufferString = buffer.toString('utf8');

        // Parse the string into an object
        // const data = JSON.parse(bufferString);

        // console.log("data", data)
        // Store it in Redis and save it in S3
        // await storeDataInRedis(data);
        // await saveDataToS3(data);
        const params = {
          Bucket: AWS_BUCKET_NAME,
          Key: `${timestamp}_batched.json`,
          Body: data,
        };
        // console.log("data", data)
        await s3.upload(params).promise();
      },
    }).then(response => {
      kafka.logger().info(`Messages sent`, {
        response,
        // msgNumber,
      })
    }).catch(e => kafka.logger().error(`[example/producer] ${e.message}`, { stack: e.stack }))
  } catch (err) {
    console.log("Couldn't connect to broker")
    console.error(err)
  }
};

runConsumer().catch(console.error);
// getDataFromRedis()
