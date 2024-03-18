const mongoose = require("mongoose");
const { Schema } = mongoose;

const BrochureSchema = new Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
  },
  topic: {
    type: String,
    maxlength: [50, "Cannot be more than 50 words"],
    required: true,
  },
  published_date: {
    // type: Date,
    type: String,
    required: [true, "Date is required"],
  },
  link: {
    // "https://www.dummy.com/"
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Brochure", BrochureSchema);
