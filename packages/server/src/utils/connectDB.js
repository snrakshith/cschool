// Experimental

const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(`./environments/.env.${process.env.NODE_ENV}`),
});

const mongoOptions = {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewURLParser: true,
};

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, mongoOptions);
    console.log("Connected to MongoDB..");
  } catch (err) {
    console.log("Could not connect to MongoDB...", err);
  }
};

mongoose.connection.on("connected", () => {
  console.log(`Mongoose is conneected to DB`);
});

mongoose.connection.on("error", (error) => {
  console.log(error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Mongoose is disconneected to DB`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = mongoDB;
