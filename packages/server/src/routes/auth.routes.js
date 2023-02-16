const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token");
router.delete("/logout");

module.exports = router;
