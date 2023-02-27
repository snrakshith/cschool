const express = require("express");
const {
  createNewPostSpecificToAuthor,
  updatePostStatus,
  getAllPosts,
} = require("../controllers/post.controller");

const router = express.Router();

router.route("/:id").put(updatePostStatus);

router.route("/").post(createNewPostSpecificToAuthor).get(getAllPosts);

module.exports = router;
