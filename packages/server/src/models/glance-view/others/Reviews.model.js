const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewsSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medium: {
      type: String,
      required: true,
      enum: ["google", "twitter", "facebook"],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Cannot be more than 50 words"],
    },
    created_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reviews", ReviewsSchema);
