const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  refreshToken,
} = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.delete("/logout");

module.exports = router;
