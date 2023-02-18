const express = require("express");
const {
  createBrochure,
  getAllBrochure,
  getBrochureById,
  getBrochureBySchoolId,
} = require("../controllers/glance/brochure.controller");

const {
  createFoundationStatement,
  getFSBySchoolId,
} = require("../controllers/glance/foundationStatement.controller");

const {
  createRatios,
  getAllRatiosBySchoolId,
} = require("../controllers/glance/ratios.controller");

const {
  getReviewsBySchoolId,
  createReviews,
} = require("../controllers/glance/reviews.controller");

const router = express.Router();

// Brochure
router.post("/brochure/create-brochure", createBrochure);
router.get("/brochure/get-brochure", getBrochureById);
router.get("/brochure/get-all-brochure", getAllBrochure);
router.get("/brochure/get-school-brochure", getBrochureBySchoolId);

// Reviews
router.post("/reviews/create-reviews", createReviews);
router.get("/reviews/get-school-reviews", getReviewsBySchoolId);

// Ratios
router.post("/ratios/create-ratios", createRatios);
router.get("/ratios/get-school-ratios", getAllRatiosBySchoolId);

// Foundation Statement
router.post(
  "/foundation-statement/create-statement",
  createFoundationStatement
);
router.get("/foundation-statement/get-school-fs", getFSBySchoolId);

module.exports = router;
