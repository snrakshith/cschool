const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(`./environments/.env.${process.env.NODE_ENV}`),
});

// Load modals
const School = require("./src/models/School.model");

const mongoOptions = {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewURLParser: true,
};
// db connection
mongoose.connect(process.env.MONGODB_URI, mongoOptions);

// Read JSON files
const schools = JSON.parse(
  fs.readFileSync(`${__dirname}/src/db/schools.json`, "utf-8")
);

// import data
const importData = async () => {
  try {
    await School.create(schools);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// delete data
const deleteData = async () => {
  try {
    await School.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
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
