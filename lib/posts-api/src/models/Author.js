const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema(
  {
    // _uniqueId: { type: mongoose.Schema.Types.ObjectId },
    author_name: {
      type: String,
      required: [true, "author name is a required field"],
    },
    email: { type: String, required: true },
    phone_number: {
      type: Number,
      required: [true, "phone number is a required field"],
    },
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Author", AuthorSchema);
