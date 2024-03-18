const mongoose = require("mongoose");
const { Schema } = mongoose;

const SummerCampSchema = new Schema({
      //  By default it is true
    name: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SummerCamp", SummerCampSchema);
