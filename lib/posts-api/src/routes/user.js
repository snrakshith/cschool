const express = require("express");
const {
  createNewUser,
  getAllUsers,
} = require("../controllers/user.controller");

const router = express.Router();

// router.route("/").get(getBootcamps).post(createBootcamp);

router.route("/").post(createNewUser).get(getAllUsers);

module.exports = router;
