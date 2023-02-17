const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");

const app = express();

// Load Env Variables
dotenv.config({ path: "./config/config.env" });

// Body-Parser Middleware
app.use(express.json());

// Custom Routes
const itemsRoutes = require("./routes/items");
const postsRoutes = require("./routes/posts");

// Route's Middleware
app.use("/api/items", itemsRoutes);
app.use("/api/posts", postsRoutes);

// Helmet Middleware
// app.use(helmet());

// Morgan Middleware
app.use(morgan("tiny"), () => console.log("Morgan Enabled.."));

// Importing Custom Middleware
// Logger Middleware
app.use(logger);

// Extracting Envirnoment Variables
const { PORT, REDIS_PORT, MONGO_URI } = process.env;

// DB Connection

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Database..."))
  .catch((err) => console.log(err));

// Redis Connection
const client = redis.createClient(REDIS_PORT, () =>
  console.log("Redis DB Started..")
);

// Server listening at Port 3000
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
