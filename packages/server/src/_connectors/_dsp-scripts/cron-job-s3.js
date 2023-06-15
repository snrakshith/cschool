const cron = require('node-cron');
const { exec } = require('child_process');

// Schedule the task to run at midnight every day
cron.schedule('0 0 * * *', () => {
  // MongoDB credentials and options
  const MONGO_HOST = 'your_mongodb_host';
  const MONGO_PORT = 'your_mongodb_port';
  const MONGO_DATABASE = 'your_mongodb_database';
  const MONGO_USERNAME = 'your_mongodb_username';
  const MONGO_PASSWORD = 'your_mongodb_password';

  // Amazon S3 credentials and options
  const AWS_ACCESS_KEY = 'your_aws_access_key';
  const AWS_SECRET_KEY = 'your_aws_secret_key';
  const AWS_BUCKET_NAME = 'your_aws_bucket_name';

  // Create a timestamp for the backup file
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');

  // Perform the MongoDB dump
  const dumpCommand = `mongodump --host ${MONGO_HOST} --port ${MONGO_PORT} --username ${MONGO_USERNAME} --password ${MONGO_PASSWORD} --db ${MONGO_DATABASE} --out /tmp/mongodump_${timestamp}`;
  exec(dumpCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`MongoDB dump failed: ${error}`);
      return;
    }
    console.log('MongoDB dump completed successfully.');

    // Upload the dump to Amazon S3
    const uploadCommand = `aws s3 cp /tmp/mongodump_${timestamp} s3://${AWS_BUCKET_NAME}/mongodump_${timestamp} --access-key ${AWS_ACCESS_KEY} --secret-key ${AWS_SECRET_KEY}`;
    exec(uploadCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`S3 upload failed: ${error}`);
        return;
      }
      console.log('Backup uploaded to Amazon S3 successfully.');

      // Clean up the local dump directory
      const cleanupCommand = `rm -rf /tmp/mongodump_${timestamp}`;
      exec(cleanupCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Cleanup failed: ${error}`);
        } else {
          console.log('Cleanup completed successfully.');
        }
      });
    });
  });
});
