const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoundationStatementSchema = new Schema({
  role: {
    type: String,
    required: true,
    enum: ["Founder", "Principal", "Chancellor"],
  },
  for_academic_year: {
    type: String,
    required: true,
    enum: ["2022-2023", "2023-2024", "2024-2025"],
  },
  published_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  link: {
    // "https://www.dummy.com/"
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "FoundationStatement",
  FoundationStatementSchema
);
