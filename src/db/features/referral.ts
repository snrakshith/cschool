export const referral = {
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
