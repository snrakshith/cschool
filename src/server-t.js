// Basic Node Setup
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const createError = require("http-errors");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

const mongoDB = require("./services/mongoDB");
const corsOptions = require("./configs/cors");
const swaggerDocs = require("./utils/swagger");

dotenv.config({
  // path: path.resolve(`./environments/.env.${process.env.NODE_ENV}`),
  path: path.resolve(`./environments/.env.local`),
});
console.log(process.env.PORT);

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

// run swagger func
swaggerDocs(app, port);

// Healthcheck route

/**
 * @openapi
 * /healthcheck:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
app.get("/healthcheck", (req, res) => {
  res.status(200).json({
    service_name: "cschool backend api",
    version: "v1",
  });
});

// Catch all route if no route matches
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

// mongoose.connection.once("open", () => {
//   app.listen(port, () => console.log(`Listening on port ${port}..`));
//   // run swagger func
//   swaggerDocs(app, port);
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}..`);
});
