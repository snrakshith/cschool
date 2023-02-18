const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// @route   GET /api/posts
// @desc    Get All Posts
// @access  Public Route

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    // res.json(posts);
    console.log(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// @route   GET /api/posts/:postID
// @desc    Get a specific Post
// @access  Public Route

router.get("/:postID", async (req, res) => {
  //   res.send("get a specific post by ID....");
  try {
    const specificPost = await Post.findById(req.params.postID);
    res.json(specificPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// @route   POST /api/posts
// @desc    Create a new Post
// @access  Public Route

router.post("/", async (req, res) => {
  //   res.send("Created a new post..");
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try {
    const savedPost = await newPost.save();
    console.log(savedPost);
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// @route   PATCH /api/posts/:postID
// @desc    Get All Posts
// @access  Public Route

router.patch("/:postID", async (req, res) => {
  //   res.send("Updated an existing post ...");
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postID },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json();
  }
});

// @route   DELETE /api/posts/:postID
// @desc    Get All Posts
// @access  Public Route

router.delete("/:postID", async (req, res) => {
  //   res.send("deleted posts....");
  try {
    const removedPost = await Post.remove({ _id: req.params.postID });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
