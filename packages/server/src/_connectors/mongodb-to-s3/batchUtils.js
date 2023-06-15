// MongoDB credentials and options
module.exports.MONGO_HOST = 'mongodb://127.0.0.1:27017/';
module.exports.MONGO_PORT = 'your_mongodb_port';
module.exports.MONGO_DATABASE = 'your_mongodb_database';
module.exports.MONGO_USERNAME = 'your_mongodb_username';
module.exports.MONGO_PASSWORD = 'your_mongodb_password';

// Amazon S3 credentials and options
module.exports.AWS_ACCESS_KEY = 'AKIAU6LC3GDWE6YYD74P';
module.exports.AWS_SECRET_KEY = '9k74AHeiCSkpxkyQV6ezAq9qT0dXJrLT56tMfGJ2';
module.exports.AWS_BUCKET_NAME = 'ikure-dsp';


// Create a timestamp for the backup file
module.exports.timestamp = new Date().toISOString().replace(/[-:.]/g, "");
