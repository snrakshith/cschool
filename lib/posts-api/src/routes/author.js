const express = require("express");
const {
  onboardNewAuthor,
  getAllAuthors,
  getPostsByAuthorName,
  updateAuthorProfile,
  deleteAuthorProfile,
} = require("../controllers/author.controller");

const router = express.Router();

// router.route("/").post(onboardNewAuthor).get(getPostsByAuthorName);
router
  .route("/")
  .post(onboardNewAuthor)
  .get(getAllAuthors)
  .delete(deleteAuthorProfile);
//   .get(getAllAuthors, getPostsByAuthorName);

router.route("/:id").put(updateAuthorProfile).delete(deleteAuthorProfile);

module.exports = router;
