const express = require("express");
const fs = require("fs");
const path = require("path");
const http = require("http");
const app = express();

app.get("/", (req, res) => {
  res.send("From SSL..");
});

const sslServer = http.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);

// Uses default Port 343
const port = 3443;

sslServer.listen(port, () => console.log(`Listening on port ${port}..`));
