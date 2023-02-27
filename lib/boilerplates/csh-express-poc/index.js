const express = require("express");
const mongoose = require("mongoose");
const corsOptions = require("./config/cors");
const logger = require("./middleware/logger");
const connectDB = require("./utils/connectDB");
const app = express();
connectDB();

app.use(corsOptions());

app.use(express.json());

// app.get("/api/posts/:year/:month", (req, res) => {
//   // res.send(req.query);
//   res.send(req.params);
//   res.send(["HI"]);
//   const bodyContent = req.body;
// });

// Dynamic Params
// localhost:3000/api/posts/2002/05
// {
//   "year": "2002",
//   "month": "05"
// }

// Also works
// localhost:3000/api/posts/2002/05?age=5
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

// Query Params
// localhost:3000/api/posts?name=rakshith&age=45
// {
//   "name": "rakshith",
//   "age": "45"
// }

// Basic
// app.get("/api/posts", (req, res) => {
//   res.send(req.query);
// });

// Advance
app.get("/api/posts", (req, res) => {
  const { name, age } = req.query;
  if (!name) {
    return res.status(400).json({
      msg: "Name is missing",
    });
  }
  return res.status(200).json({
    msg: `Query Param name ${name} ${age}`,
  });
});

let arr = [];

app.get("/api/posts", (req, res) => {
  if (arr.length === 0) {
    return res.status(200).json({
      msg: "No data",
    });
  }
  return res.status(200).json({
    data: arr,
  });
});

app.post("/api/posts", logger, async (req, res) => {
  const { name, age } = req.body;
  if (!name) {
    return res.status(400).json({
      msg: "name is missing",
    });
  }
  if (!age) {
    return res.status(400).json({
      msg: "age is missing",
    });
  }
  if (typeof age !== "number") {
    return res.status(400).json({
      msg: "age must be a number",
    });
  }

  let customData = {
    name,
    age,
    restData: { ...req.body },
  };

  try {
    await res.status(201).json({
      msg: "Succesfully created.",
      data: customData,
    });
    arr.push(customData);
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
});

app.get("/api/promotions", (req, res) => {
  console.log(req?.query);
  console.log(req?.params);
});

app.get("/api/test", (req, res) => {
  res.status(200).json({
    service_name: "test",
    version: "v1",
  });
});

const port = process.env.PORT || 3000;
// Uses default Port 3000

mongoose.connection.once("open", () => {
  app.listen(port, () => console.log(`Listening on port ${port}..`));
});
// app.listen(port, () => console.log(`Listening on port ${port}..`));
