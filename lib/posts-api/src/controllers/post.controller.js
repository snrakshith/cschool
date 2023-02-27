const Post = require("../models/Post");

exports.getAllPosts = async (req, res, next) => {
  try {
    const updatePost = await Post.find().populate("author");
    return res.status(200).json({ status: false, data: updatePost });
  } catch (error) {
    return res.status(500).json({ status: false, message: error });
  }
};

exports.createNewPostSpecificToAuthor = async (req, res, next) => {
  const { post_name, description, post_status, author } = req.body;
  if (!post_name) {
    return res
      .status(400)
      .json({ status: false, message: "postName is required" });
  }

  if (!description) {
    return res
      .status(400)
      .json({ status: false, message: "description is required" });
  }

  //   if (!post_status) {
  //     return res
  //       .status(400)
  //       .json({ status: false, message: "postStatus is required" });
  //   }
  try {
    // const postAuthor = await Author.findOne({ author });
    const data = {
      post_name,
      description,
      post_status,
      // postAuthor,
    };
    // const newPost = await Post.create(data);
    const newPost = await Post.create(req.body);
    await newPost.save();
    return res.status(201).json({ status: true, data: newPost });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updatePostStatus = async (req, res, next) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatePost) {
      return res
        .status(400)
        .json({ status: false, message: "Failed to update status" });
    }
    return res.status(200).json({
      status: true,
      message: "Successfully updated status",
      data: updatePost,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error });
  }
};

exports.deletePost = (req, res, next) => {};
