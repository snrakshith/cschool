const express = require("express");
const {
  createBrochure,
  getAllBrochure,
  getBrochureById,
  getBrochureBySchoolId,
} = require("../../controllers/glance/brochure.controller");

const router = express.Router();

router.post("/create-brochure", createBrochure);
router.get("/get-brochure", getBrochureById);
router.get("/get-all-brochure", getAllBrochure);
router.get("/get-school-brochure", getBrochureBySchoolId);

module.exports = router;
