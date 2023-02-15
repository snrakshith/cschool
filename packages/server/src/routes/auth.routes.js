const express = require("express");
const router = express.Router();

router.post("/register");
router.post("/login");
router.post("/refresh-token");
router.post("/logut");

module.exports = router;
