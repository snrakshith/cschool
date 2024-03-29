// Basic Node Setup
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const createError = require("http-errors");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const { Kafka } = require('kafkajs')

const options = require("./configs/swaggerOptions");
const specs = swaggerJSDoc(options);

const mongoDB = require("./services/mongoDB");
const corsOptions = require("./configs/cors");

dotenv.config({
  path: path.resolve(`./environments/.env.${process.env.NODE_ENV}`),
});
// console.log(process.env.MONGODB_URI);

mongoose.set('strictQuery', false);

const app = express();
// Accept Json to parse
app.use(express.json());

// Cors setup
app.use(cors(corsOptions));

// Logger setup
app.use(morgan("dev"));

// Uses default Port 4000
const port = process.env.PORT || 4000;

// Run mongoDB setup
mongoDB();


// Create a Kafka client
const kafka = new Kafka({
  clientId: 'demo_poc',
  brokers: ['localhost:9092',], // Add your Kafka broker addresses
});

// Create a Kafka producer
// const producer = kafka.producer();

async function createProducer(data) {
  try {
    const producer = kafka.producer()
    await producer.connect()
    console.log('Producer connected', data)
    await producer.send({
      topic: 'tutorialspedia',
      messages: [{ value: data }],
    }).then(response => {
      kafka.logger().info(`Messages sent`, {
        response, data
        // msgNumber,
      })
    }).catch(e => kafka.logger().error(`[example/producer] ${e.message}`, { stack: e.stack }))

    await producer.disconnect()
  } catch (err) {
    console.log("Couldn't connect to broker")
    console.error(err)
  }
}

// Import Route Files

const authRoute = require("./routes/auth.routes");
const schoolRoute = require("./routes/school.routes");
const homepageRoute = require("./routes/homepage.routes");
const glanceRoute = require("./routes/glance.routes");
const miscRoute = require("./routes/misc.routes");
const mediaRoute = require("./features/media/media.routes");
const School = require("./models/School.model");

// API Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/homepage", homepageRoute);
app.use("/api/v1/school", schoolRoute);
app.use("/api/v1/glance", glanceRoute);
app.use("/api/v1/misc", miscRoute);
app.use("/api/v1/media", mediaRoute);

// Access the MongoDB collection

School.watch().on("change", async (data) => {
  // Connect to Kafka
  // await producer.connect();

  if (data.operationType === "insert") {
    console.log("Data inserted: ", data.fullDocument);
    await createProducer(JSON.stringify(data.fullDocument))
    // await producer.send({
    //   topic: 'tutorialspedia',
    //   messages: [
    //     { value: JSON.stringify(data.fullDocument) },
    //   ],
    // })
    // await producer.disconnect()
  }

  if (data.operationType === "replace") {
    console.log("Data updated: ", data.fullDocument);
  }

  if (data.operationType === "delete") {
    console.log("Data deleted: ", data._id);
  }
})

// Health route
app.get("/healthcheck", (req, res) => {
  res.status(200).json({
    service_name: "test",
    version: "v1",
  });
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

// OpenAPI Json
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

app.use(async (req, res, next) => {
  next(createError.NotFound("Route not found"));
});

// Catch all route if no route matches
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
  });
});

mongoose.connection.once("open", () => {
  app.listen(port, () => console.log(`Listening on port ${port}..`));
});
