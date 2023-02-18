const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewsSchema = new Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medium: {
    type: String,
    required: [true, "Medium is required"],
    enum: ["google", "twitter", "facebook"],
  },
  school_rating: {
    type: Number,
    required: [true, "Can rate between `1 to 5` 5 being the highest"],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: [150, "Cannot be more than 50 words"],
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Reviews", ReviewsSchema);
