const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  createFeatures,
  getAllFeatures,
} = require("../controllers/homepage.controller");

router.get("/get-all", getAllFeatures);

router.post("/create", multer().none(), createFeatures);

module.exports = router;
