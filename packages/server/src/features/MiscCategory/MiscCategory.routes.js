const express = require("express");
const router = express.Router();

const {
  getAllMiscCategory,
  createNewMiscCategory,
} = require("../controllers/MiscCategory.controller");

router.get("/get-MiscCategory", getAllMiscCategory);

router.post("/create-MiscCategory", createNewMiscCategory);

exports.module = router;
