const { Schema, default: mongoose } = require("mongoose");

const HomePageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      enum: ["School", "Exam", "SDP"],
    },
    description: {
      type: String,
      maxLength: [100, "Cannot be more than 50 words"],
      required: [true, "description is required"],
    },
    assets: {
      images: {
        type: [String],
        // required: true,
      },
    },
    card_type: {
      type: String,
      required: [true, "card type is required"],
      enum: ["normal", "mini", "mega"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HomePage", HomePageSchema);
