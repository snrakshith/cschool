const express = require("express");
const {
  onboardNewSchool,
  getAllSchools,
  getSchoolsInRadius,
  deleteSchool,
  getSchoolById,
} = require("../controllers/school.controller");
const upload = require("../middlewares/upload");

const { verifyAccessToken } = require("../utils/jwt");

/**
 * @swagger
 * components:
 *  parameters:
 *    uhid:
 *      in: query
 *      name: uhid
 *      required: true
 *      schema:
 *        type: string
 *      description: uhid
 *    healthcardnumber:
 *      in: path
 *      name: healthcardnumber
 *      required: true
 *      schema:
 *        type: string
 *      description: healthcardnumber
 *    facilityCode:
 *      in: query
 *      name: facilityCode
 *      required: true
 *      schema:
 *        type: string
 *      description: facilityCode
 *    familyId:
 *      in: query
 *      name: familyId
 *      required: true
 *      schema:
 *        type: string
 *      description: familyId
 *    clusterNumber:
 *      in: query
 *      name: clusterNumber
 *      required: true
 *      schema:
 *        type: string
 *      description: clusterNumber
 *    communityNumber:
 *      in: query
 *      name: communityNumber
 *      required: true
 *      schema:
 *        type: string
 *      description: communityNumber
 */
const router = express.Router();
router
  /**
   * @swagger
   * /all:
   * get:
   *  tags:
   *    - All schools
   *    name: School
   *    description: School endpoint
   *    responses:
   *      200:
   *        description: App is up and running
   */
  // .get("/all", verifyAccessToken, getAllSchools);
  .get("/all", getAllSchools);

// router.route("/:schoolId").get(getSchoolById);

router.route("/").get(getSchoolById);

// router.route("/near-by/:pincode/:distance").get(getSchoolsInRadius);

// const logoUpload = upload.fields([{ name: "logo", maxCount: 1 }]);
// router.route("/create").post(upload.single("logo"), onboardNewSchool);
// router.route("/create").post(logoUpload, onboardNewSchool);

router.route("/create").post(onboardNewSchool);

// router.route("/delete/:id").delete(deleteSchool);

router.route("/delete").delete(deleteSchool);

module.exports = router;
