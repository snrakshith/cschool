const express = require("express");
const multer = require("multer");
const router = express.Router();

const { createMisc, getMisc } = require("../controllers/misc.controller");

router.get("/getMisc", getMisc);

router.post("/createMisc", multer().none(), createMisc);

module.exports = router;
