const { Kafka } = require('kafkajs');
const MongoClient = require('mongodb').MongoClient;

// Create a Kafka client
const kafka = new Kafka({
  clientId: "demo_poc",
  brokers: ["localhost:9092"], // Add your Kafka broker addresses
});


const batchPipeline = async () => {
  try {
    const consumer = kafka.consumer({ groupId: "my-group" })
    await consumer.connect()
    await consumer.subscribe({ topic: 'tutorialspedia', fromBeginning: true })

    await consumer.run({
      eachBatch: async ({ batch }) => {
        // Buffer and aggregate the data from the batch
        const bufferedData = batch.messages.map((message) => message.value.toString());
        console.log("bufferedData", bufferedData)
        // Process and transform the bufferedData as needed
        const processedData = bufferedData.map((data) => {
          // Perform your data processing logic here
          return data.toUpperCase();
        });

        // Store the processed data in MongoDB
        const uri = 'mongodb://127.0.0.1:27017/';
        const client = new MongoClient(uri);
        await client.connect();
        const collection = client.db('streamdb').collection('streamCollection');
        await collection.insertMany(processedData);
        await client.close();
      },
    });
  } catch (error) {
    console.log("Couldn' connect to broker")
    console.error(error)
  }
};

batchPipeline().catch(console.error);
// batchPipeline()

