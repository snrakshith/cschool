const { Schema, default: mongoose } = require("mongoose");

const CMSSchema = new Schema(
  {
    layout_info: {
      name: {
        type: String,
        required: [true, "name is required"],
        enum: ["School"],
      },
      position: {
        type: Number,
        required: true,
      },
      slot_number: {
        type: Number,
        required: true,
      },
      go_to: {
        type: String,
        required: true,
      },
      assets: {
        images: {
          type: String,
          required: true,
        },
        videos: {
          type: String,
          required: true,
        },
      },
    },
    type: {
      type: String,
      required: [true, "name is required"],
      enum: ["normal", "mini", "mega"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CMSSchema", CMSSchema);
