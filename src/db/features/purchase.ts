const purchase = [
  {
    brand_info: {
      name: "",
      establisment_year: "",
    },
    product_info: {
      name: "",
      availbitlity: true,
      category: "",
      manufactures_info: {
        name: "",
        country_of_origin: "",
        manufactured_date: "",
        warrenty: "",
      },
      assets: {
        pictures: [{}],
        video_clips: [{}],
      },
      reviews_and_ratings: [{}],
      price: [
        {
          net_price: "",
          original: "",
          discount_info: {
            has_discount: true,
            percentage: 5,
          },
          tax_info: {
            region: [
              {
                country: "India",
                country_code: "IN",
                slab_details: {
                  name: "CGST",
                  per_region: 1.3,
                },
              },
              {
                local: "Karnataka",
                local_code: "KA",
                slab_details: {
                  name: "SGST",
                  per_region: 1.3,
                },
              },
            ],
            total_percentage: 5,
          },
        },
      ],
    },
    sellers_info: {
      name: "",
      category: "",
      address: {},
      communication: {},
      reviews_and_ratings: [{}],
      assets: {
        pictures: [{}],
        video_clips: [{}],
      },
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
