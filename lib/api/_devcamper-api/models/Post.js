const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Posts", PostSchema);
module.exports = Post;
