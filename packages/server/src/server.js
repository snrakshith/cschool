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

const options = require("./configs/swaggerOptions");
const specs = swaggerJSDoc(options);

const mongoDB = require("./services/mongoDB");
const corsOptions = require("./configs/cors");

dotenv.config({
  path: path.resolve(`./environments/.env.${process.env.NODE_ENV}`),
});
console.log(process.env.MONGODB_URI);

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

// Import Route Files

const authRoute = require("./routes/auth.routes");
const schoolRoute = require("./routes/school.routes");
const cmsRoute = require("./routes/cms.routes");

// API Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cms", cmsRoute);
app.use("/api/v1/school", schoolRoute);

// Test route

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
