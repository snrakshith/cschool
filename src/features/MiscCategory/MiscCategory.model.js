const mongoose = require("mongoose");
const { Schema } = mongoose;

const MiscCategorySchema = new Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "School id is required"],
    },
    name: {
      type: String,
      required: true,
      enum: [
        "sdps",
        "student_scholarship_programs",
        "events",
        "school_value_added_services",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MiscCategory", MiscCategorySchema);
