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
let promotions = {
  consent: true,
  //    communication_mode ,  medium ,prefereed_mode_of_communication
  medium: "EMAIL", // Email , WhatsApp
  frequency: "WEEKLY", // weekly , 3 months , custom
  subscribed_topics: ["FINANCE"], // finance , healthcare , custom
  tag: "FINANCE", // weekly , 3 months , custom
};

let referral = {
  referral_code: "AX014P",
  communication_mode: "Email",
  referred_to: [
    {
      username: "Rakshith",
      date: "14-07-2027",
      points_earned: 5,
    },
  ],
  points: {
    total_points_earned: 50,
    points_per_user: 5,
    total_no_users_referred: 10,
    balance_points: 35, // total points && balance points are same after redumption it is reduced
    exp_date: "01-01-2025",
  },
  // redeem ,  redeem_history , payment_history any name would work..
  redeem_history: [
    {
      points_redeemed: 15,
      date_of_redumtion: "21-07-2023",
      payment_option: "Paytm",
      balance_points: 35,
    },
  ],
};
