const mongoose = require("mongoose");
const { Schema } = mongoose;

const PromotionSchema = new Schema({
  consent: { type: Boolean, default: false },
  medium: {
    type: String,
    required: true,
    enum: ["Email", "WhatsApp"],
  },
  frequency: {
    type: String,
    required: true,
    enum: ["weekly", "3 months", "custom"],
  },
  subscribed_topics: {
    type: String,
    required: true,
    enum: ["finance", "healthcare", "custom"],
  },
});

module.exports = mongoose.model("Promotion", PromotionSchema);
