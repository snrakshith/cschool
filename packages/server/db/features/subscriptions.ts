enum SubscriptionTypes {
  BOOKS_AND_MAGAZINES,
  MOCK_TEST_PAPERS,
  IEEE,
  Science_MAGAZINES,
  NEWSLETTERS,
  NEWSPAPERS,
}

const active_subscription_list = [SubscriptionTypes];

const subscriptions = [
  {
    name: active_subscription_list,
    category: "",
    plan: {
      name: "",
      purchase_date: "",
      validity: "",
    },
    payments: [
      {
        name: "",
        options: ["cash", "online"],
        selected_options: "cash",
        amount_payed: 52,
        invoice_generated: {
          date: "",
          file_to_download: "",
        },
        status: true,
        user_notified: true, // via a communocation channel
        communication: {
          enabled: true,
          medium: ["SMS", "EMAIL", "BOTH"],
          selected: "SMS",
        },
      },
    ],
  },
];

const bookmarks = [
  {
    favorite_school: [{}],
    favorite_college: [{}],
  },
];
