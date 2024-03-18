const express = require("express");
const router = express.Router();

// const {
//   getAllMedia,
//   createNewMedia,
// } = require("../controllers/Media.controller");
const { getAllMedia, createMedia } = require("./media.controller");

router.get("/get-Media", getAllMedia);

router.post("/create-Media", createMedia);

module.exports = router;
