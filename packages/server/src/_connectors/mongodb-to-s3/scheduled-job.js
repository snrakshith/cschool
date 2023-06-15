const cron = require('node-cron');
const AWS = require('aws-sdk');
const MongoClient = require('mongodb').MongoClient;

// '*/2 * * * *' every 2 mintues
// Every day at midnight (0 0 * * *)

cron.schedule('0 0 * * *', async () => {
  console.log('Running the Cron Job');

  // Connect to MongoDB
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  await client.connect();

  // Retrieve the data from MongoDB
  const collection = client.db('mydb').collection('mycollection');
  const data = await collection.find().toArray();

  // Export data to S3
  const s3 = new AWS.S3({
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
  });

  const bucketName = 'dsp-bucket';
  const fileName = 'data.json';

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: JSON.stringify(data),
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('S3 upload error:', err);
    } else {
      console.log('Data exported to S3 successfully:', data.Location);
    }
  });

  await client.close();
  console.log('Job ran successfully...');
}, {
  name: "Batch Processing",
  scheduled: true,
  timezone: "Asia/Kolkata"
});
