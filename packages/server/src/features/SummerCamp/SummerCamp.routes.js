const express = require("express");
const router = express.Router();

const {
  getAllSummerCamp,
  createNewSummerCamp,
} = require("../controllers/SummerCamp.controller");

router.get("/get-SummerCamp", getAllSummerCamp);

router.post("/create-SummerCamp", createNewSummerCamp);

exports.module = router;
