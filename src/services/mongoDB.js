// Third Party Services goes in here..
const mongoose = require("mongoose");

const mongoOptions = {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewURLParser: true,
};

const mongoDB = async () => {
  try {
    // await mongoose.createConnection(process.env.MONGODB_URI, mongoOptions);
    await mongoose.connect("mongodb+srv://rakshithsn:yOAOkVzovxrmdATl@cluster0.xzhsxfh.mongodb.net/blogs?retryWrites=true&w=majority", mongoOptions);
    // await mongoose.connect("mongodb://127.0.0.1:27017/", mongoOptions);
    console.log("Connected to MongoDB..");
  } catch (err) {
    console.log("Could not connect to MongoDB...", err);
  }
};

mongoose.connection.on("connected", () => {
  console.log(`Mongoose is connected to DB`);
});

mongoose.connection.on("error", (error) => {
  console.log(error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Mongoose is disconnected to DB`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = mongoDB;
