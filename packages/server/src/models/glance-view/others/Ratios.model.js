const mongoose = require("mongoose");
const { Schema } = mongoose;

const RatiosSchema = new Schema({
  school_id: {
    type: Schema.Types.ObjectId,
    ref: "School",
  },
  teacher_to_students: {
    type: String,
    required: true,
    enum: ["1:20", "1:30", "1:40", "1:50", "1:60"],
  },
  acceptency: {
    type: String,
    required: true,
    enum: [".5%", "1.5%", "2%", "2:5%", "3%", "3.5%", "4%", "4.5%", "5%"],
  },
});

module.exports = mongoose.model("Ratios", RatiosSchema);
