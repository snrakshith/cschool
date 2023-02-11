const express = require("express");
const {
  onboardNewSchool,
  getAllSchools,
  getSchoolsById,
  getSchoolsInRadius,
} = require("../controllers/school.controller");
// const upload = require("../middlewares/upload");
const upload = require("../../upload");

const router = express.Router();

router.route("/all").get(getAllSchools);

router.route("/near-by/:pincode/:distance").get(getSchoolsInRadius);

const logoUpload = upload.fields([{ name: "logo", maxCount: 1 }]);

router.route("/create").post(upload.single("logo"), onboardNewSchool);
// router.route("/create").post(logoUpload, onboardNewSchool);

module.exports = router;
