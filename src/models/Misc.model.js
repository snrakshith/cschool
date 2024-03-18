const mongoose = require("mongoose");
const { Schema } = mongoose;

const MiscSchema = new Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: [true, "School id is required"],
  },
  sdps: [
    {
      name: {
        type: String,
        required: [true, "name is required"],
        enum: [
          "yoga",
          "music",
          "swimming",
          "chess",
          "karate_classes",
          "coding_classes",
          "public_speaking",
          "summer_camps",
          "foreign_languages",
        ],
      },
      availablity_status: {
        type: Boolean,
        // default: false,
        required: [true, "availablity_status is required"],
      },

      // foreign_languages: {
      //   Germany: false,
      //   Spanish: false,
      // },
    },
  ],
  student_scholarship_programs: [
    {
      name: {
        type: String,
        required: [true, "name is required"],
        enum: [
          "government",
          "ngos",
          "private_corporation",
          "hni",
          "fundraisals",
          "adoption",
        ],
        default: "government",
      },
      availablity_status: {
        type: Boolean,
        // default: false,
        required: [true, "availablity_status is required"],
      },
    },
  ],
  events: [
    {
      name: {
        type: String,
        required: [true, "name is required"],
        enum: [
          "best_idea_compitions",
          "hackathon",
          "essay",
          "quizzes",
          "sports_day",
          "olympiads",
        ],
        default: "best_idea_compitions",
      },
      availablity_status: {
        type: Boolean,
        default: false,
        required: [true, "availablity_status is required"],
      },
    },
  ],
  school_value_added_services: [
    {
      name: {
        type: String,
        required: [true, "school_vas is required"],
        enum: [
          "loans_from_entites",
          "emergency_cash",
          "cibil_score",
          "scholarship",
        ],
        default: "loans_from_entites",
      },
      availablity_status: {
        type: Boolean,
        default: false,
        required: [true, "availablity_status is required"],
      },
    },
  ],
});

module.exports = mongoose.model("Misc", MiscSchema);
