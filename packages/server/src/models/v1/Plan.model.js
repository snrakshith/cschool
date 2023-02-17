/**
 * 1 org will have only 1 active plan
 * they can always upgrade the plan
 */

// details which school would be able to see
const create_plan = {
  title: "Starter",
  billing_cycle: "Monthly",
  cost: {
    currency: "Rupee",
    price: "3500",
  },
  plan_validity: "30Days",
  features_included: [
    {
      name: "support_avaliable",
      description: true,
    },
    {
      name: "can_create",
      description: "Upto 5 schools",
    },
    {
      name: "can_onboard",
      description: "Upto 15 teachers",
    },
    {
      name: "can_onboard",
      description: "Upto 1500 students",
    },
  ],
  support_code: "SC-5123",
  plan_info: {
    onboarded_date: "2-02-2023",
    validity_in_days: "45Days",
    expiration_date: "12-05-2023",
    referral_code: "KJS22278",
    referral_by: "cschool_plateform",
    got_to_know: ["friend", "facebook"],
  },
};

const planSchema = {
  title: String,
  billing_cycle: {
    type: String,
    enum: ["Monthly", "Anually", "Yearly"],
  },
  plan_validity: ["30Days"],
  features_included: [
    {
      name: String,
      description: String,
    },
  ],
  support_code: String, // SC-5123
  plan_info: {
    onboarded_date: Date,
    validity_in_days: String,
    expiration_date: Date,
    referral_code: String,
    referral_by: String,
    got_to_know: {
      type: [String],
      enum: ["Friend", "Facebook"],
    },
  },
};
