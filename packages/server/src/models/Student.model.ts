const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
      //  By default it is true
    demo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
