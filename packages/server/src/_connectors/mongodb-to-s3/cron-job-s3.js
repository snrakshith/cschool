const cron = require("node-cron");
const { exec } = require("child_process");
const {
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  timestamp,
} = require("./batchUtils");

const runConvertor = require('./bson-2-json')

// Schedule the task to run at midnight every day
cron.schedule("*/2 * * * *", () => {
  // Upload the dump to Amazon S3
  // const uploadCommand = `aws s3api cp /mongodump_${timestamp} s3://${AWS_BUCKET_NAME}/mongodump_${timestamp} --access-key ${AWS_ACCESS_KEY} --secret-key ${AWS_SECRET_KEY}`;
  const uploadCommand = `aws s3 sync ./mongodump_${timestamp} s3://${AWS_BUCKET_NAME}/mongodump_${timestamp}`;
  exec(uploadCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`S3 upload failed: ${error}`);
      const cleanupCommand = `rm -rf /mongodump_${timestamp}`;
      exec(cleanupCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Cleanup failed: ${error}`);
        } else {
          console.log("Cleanup completed successfully.");
        }
      });
      return;
    }
    console.log("Data uploaded to Amazon S3 successfully.");

    // Clean up the local dump directory
    const cleanupCommand = `rm -rf /mongodump_${timestamp}`;
    exec(cleanupCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Cleanup failed: ${error}`);
      } else {
        console.log("Cleanup completed successfully.");
        process.exit(0)
      }
    });
  });
  // });
});
