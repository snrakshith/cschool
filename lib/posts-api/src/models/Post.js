const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    post_name: {
      type: String,
      required: true,
      maxLength: 55,
      minLength: 5,
    },
    description: { type: String, maxLength: 255, minLength: 5, required: true },
    post_status: { type: Boolean, required: [true, "Status is required"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
