// Third Party Services goes in here..

const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/demo", {
      useUnifiedTopology: true,
      useNewURLParser: true,
    });
    console.log("Connected to MongoDB..");
  } catch (err) {
    console.log("Could not connect to MongoDB...", err);
  }
};

module.exports = mongoDB;
