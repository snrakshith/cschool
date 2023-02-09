const express = require("express");
const router = express.Router();

const {
  getAllOfferings,
  createNewOfferings,
} = require("../controllers/cms.controller");

router.get("/get-offerings", getAllOfferings);

router.post("/create-offerings", createNewOfferings);

exports.module = router;
