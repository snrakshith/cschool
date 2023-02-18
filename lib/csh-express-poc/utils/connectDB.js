const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/demo", {
      useUnifiedTopology: true,
      useNewURLParser: true,
    });
    console.log("Connected to MongoDB..");
  } catch (err) {
    console.log("Could not connect to MongoDB...", err);
  }
};

module.exports = connectDB;
