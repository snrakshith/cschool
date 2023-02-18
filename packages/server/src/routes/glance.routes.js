const express = require("express");
const router = express.Router();

// ------------- Brochure ------------ //
const {
  createBrochure,
  getAllBrochure,
  getBrochureById,
  getBrochureBySchoolId,
} = require("../controllers/glance/brochure.controller");

router.post("/brochure/create-brochure", createBrochure);
router.get("/brochure/get-brochure", getBrochureById);
router.get("/brochure/get-all-brochure", getAllBrochure);
router.get("/brochure/get-school-brochure", getBrochureBySchoolId);

// ------------- Reviews ------------ //

const {
  getReviewsBySchoolId,
  createReviews,
} = require("../controllers/glance/reviews.controller");

router.post("/reviews/create-reviews", createReviews);
router.get("/reviews/get-school-reviews", getReviewsBySchoolId);

// ------------- Ratios ------------ //

const {
  createRatios,
  getAllRatiosBySchoolId,
} = require("../controllers/glance/ratios.controller");

router.post("/ratios/create-ratios", createRatios);
router.get("/ratios/get-school-ratios", getAllRatiosBySchoolId);

// ------------- Foundation Statement ------------ //

const {
  createFoundationStatement,
  getFSBySchoolId,
} = require("../controllers/glance/foundationStatement.controller");

router.post(
  "/foundation-statement/create-statement",
  createFoundationStatement
);
router.get("/foundation-statement/get-school-fs", getFSBySchoolId);

// ------------- Campus Overview ----------- //

const {
  getCampusOverview,
  createCampusOverview,
} = require("../controllers/campusOverview.controller");

router.post("/campus-overview/create-statement", createCampusOverview);
router.get("/campus-overview/get-school-fs", getCampusOverview);

module.exports = router;
