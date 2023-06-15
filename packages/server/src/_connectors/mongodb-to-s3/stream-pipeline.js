
const { Kafka } = require('kafkajs')
// const AWS = require('aws-sdk');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");

// Create a Kafka client
const kafka = new Kafka({
  clientId: "demo_poc",
  brokers: ["localhost:9092"], // Add your Kafka broker addresses
});

// const s3 = new AWS.S3({
//   accessKeyId: 'your-aws-access-key',
//   secretAccessKey: 'your-aws-secret-access-key'
// });
mongoose.set('strictQuery', true);
async function streamPipeline() {
  try {
    const consumer = kafka.consumer({ groupId: "my-group", retry: { retries: 5 } })
    await consumer.connect()
    await consumer.subscribe({ topic: 'tutorialspedia', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })

        // const { key, value } = message;

        // Process the message data as needed
        // const processedData = value.toString();
        // console.log(processedData)
        // Upload the processed data to AWS S3
        // await s3.putObject({
        //   Bucket: 'your-s3-bucket',
        //   Key: 'your-s3-key',
        //   Body: processedData
        // }).promise();

        // Store the processed data in MongoDB
        // const uri = 'mongodb://localhost:27017/streamdb';
        // const client = new MongoClient(uri);
        // await client.connect();
        // const collection = client.db('streamdb').collection('streamCollection');
        // await collection.insertMany(processedData);
        // await client.close();


        try {

          // Assuming you have a variable 'binData' containing the binary data
          const binData = message.value; // Your binary data

          // Convert binData to a Buffer
          const buffer = Buffer.from(binData, 'binary');

          // Convert the Buffer to a string
          const bufferString = buffer.toString('utf8');

          // Parse the string into an object
          const object = JSON.parse(bufferString);

          await mongoose.connect("mongodb://127.0.0.1:27017/", { dbName: "streamdb" });
          const client = new MongoClient("mongodb://127.0.0.1:27017/");
          await client.connect();
          const collection = client.db('streamdb').collection('streamcollections');
          await collection.insertOne(object);
          console.log("Connected to MongoDB..");
        } catch (err) {
          console.log("Could not connect to MongoDB...", err);
        }

      },
    }).then(response => {
      kafka.logger().info(`Messages sent`, {
        response,
        // msgNumber,
      })
    }).catch(e => kafka.logger().error(`[example/producer] ${e.message}`, { stack: e.stack }))

    // await consumer.disconnect()
  } catch (err) {
    console.log("Couldn' connect to broker")
    console.error(err)
  }
}

mongoose.connection.on("connected", () => {
  console.log(`Mongoose is connected to stream DB`);
});

streamPipeline().catch(console.error);
