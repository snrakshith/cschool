const mongoose = require("mongoose");
const { Schema } = mongoose;

const BrochureSchema = new Schema({
  topic: {
    type: String,
    maxlength: [50, "Cannot be more than 50 words"],
    required: true,
  },
  published_date: {
    type: Date,
    required: true,
  },
  link: {
    // "https://www.dummy.com/"
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Brochure", BrochureSchema);
