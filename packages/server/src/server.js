// Basic Node Setup
const express = require("express");
const mongoose = require("mongoose");
const mongoDB = require("./services/mongoDB");

const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;
// Uses default Port 4000

mongoDB();

// Import Route Files

const schoolRoute = require("./routes/school.routes");
const cmsRoute = require("./routes/cms.routes");

app.use("/api/v1/cms", cmsRoute);
app.use("/api/v1/school", schoolRoute);

app.get("/api/test", (req, res) => {
  res.status(200).json({
    service_name: "test",
    version: "v1",
  });
});

mongoose.connection.once("open", () => {
  app.listen(port, () => console.log(`Listening on port ${port}..`));
});
