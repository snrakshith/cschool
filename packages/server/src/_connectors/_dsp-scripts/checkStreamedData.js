// checkStreamedConsumedData.js


const { Kafka } = require('kafkajs')
// const AWS = require('aws-sdk');

// Create a Kafka client
const kafka = new Kafka({
  clientId: "demo_poc",
  brokers: ["localhost:9092"], // Add your Kafka broker addresses
});

const s3 = new AWS.S3({
  accessKeyId: 'your-aws-access-key',
  secretAccessKey: 'your-aws-secret-access-key'
});

async function viewConsumer() {
  try {
    const consumer = kafka.consumer({ groupId: "my-group" })
    await consumer.connect()
    await consumer.subscribe({ topic: 'tutorialspedia', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })

        // const { key, value } = message;

        // // Process the message data as needed
        // const processedData = value.toString();

        // // Upload the processed data to AWS S3
        // await s3.putObject({
        //   Bucket: 'your-s3-bucket',
        //   Key: 'your-s3-key',
        //   Body: processedData
        // }).promise();

      },
    }).then(response => {
      kafka.logger().info(`Messages sent`, {
        response,
        // msgNumber,
      })
    }).catch(e => kafka.logger().error(`[example/producer] ${e.message}`, { stack: e.stack }))

    await producer.disconnect()
  } catch (err) {
    console.log("Couldn' connect to broker")
    console.error(err)
  }
}



viewConsumer()
