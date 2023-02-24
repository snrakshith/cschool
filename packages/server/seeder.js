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
// db connection
mongoose.connect(process.env.MONGODB_URI, mongoOptions);

// import data
const importData = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

// delete data
const deleteData = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
}

if (process.argv[2] === "-d") {
  deleteData();
}
