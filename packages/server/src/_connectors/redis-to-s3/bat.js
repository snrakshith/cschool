const { Kafka } = require('kafkajs');
const AWS = require('aws-sdk');
const redis = require('ioredis');
const { AWS_BUCKET_NAME, timestamp, AWS_ACCESS_KEY, AWS_SECRET_KEY } = require('../mongodb-to-s3/batchUtils');

// Create a Kafka client
const kafka = new Kafka({
  clientId: "demo_poc",
  brokers: ["localhost:9092"], // Add your Kafka broker addresses
});


const runConsumer = async () => {
  try {
    const consumer = kafka.consumer({ groupId: 'my-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'tutorialspedia', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const data = JSON.parse(message.value.toString());

        // Store data in Redis

        const redisClient = new redis();

        // Example: Set a key-value pair in Redis
        await redisClient.set('your_key', JSON.stringify(data));

        // Save data in S3

        const s3 = new AWS.S3({
          accessKeyId: AWS_ACCESS_KEY,
          secretAccessKey: AWS_SECRET_KEY,
        });

        const timestamp = new Date().getTime(); // Generate a timestamp for unique filenames
        const fileName = `data/${timestamp}.json`; // Unique filename for each message

        const params = {
          Bucket: AWS_BUCKET_NAME,
          Key: fileName,
          Body: JSON.stringify(data),
        };

        s3.upload(params, function (err, data) {
          if (err) {
            console.log('Error uploading to S3:', err);
          } else {
            console.log('Data uploaded to S3:', data);
          }
        });
      },
    }).then(response => {
      kafka.logger().info(`Messages sent`, {
        response,
        // msgNumber,
      })
    }).catch(e => kafka.logger().error(`[example/consumer] ${e.message}`, { stack: e.stack }))

    // await consumer.disconnect()
  } catch (err) {
    console.log("Couldn' connect to broker")
    console.error(err)
  }
};

runConsumer().catch((err) => {
  console.error('Error running the Kafka consumer:', err);
});
