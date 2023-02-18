export const school = [
  {
    // Required Fields
    name: "",
    phone: 8951432665,
    email_id: "snrakshith.97@gmail.com",
    address: {
      site: "",
      landmark: "", // Optional
      pincode: "",
      state: "",
    },
    scholarship_for_students: false,
    number_of_students: 50,
    teacher_strength: 50,
    facilities: ["library", "food court"], // Array of String
    // V2 of the API
    year_of_eastablisment: "Date",
    school_id: "System Generated",
    school_logo: "logo.svg",
    school_images: ["img1.png", "img2.jpeg"],
    school_location: {
      lat: 98.6,
      long: 51.54,
    },
    courses_offered: [
      {
        board: "icse",
        eligibility_critery: "above 10 years",
        class_from: "1 to 10", // Can rate between `1 to 5` 5 being the highest
      },
      {
        board: "cbse",
        eligibality_critery: "above 10 years",
        class_from: "1 to 10",
      },
      {
        board: "state_board",
        eligibality_critery: "above 10 years",
        class_from: "1 to 10",
      },
    ],
    // V3
    school_rating: "3.5", // Can rate between `1 to 5` 5 being the highest
    // By default `day_schooler`
    school_type: "day_schooler" || "boarding", // enum
    // Available only if `school_type` value is `boarding`
    boarding_facilies: {
      food_menu: "veg" || "non_veg", // enum
      laundry_service: false, // boolean
      hostel_type: ["boys", "girls"], // Array of specific values
    },
    //  By default it is true
    school_status: true, // School status - if active true or else false
  },
];

export const basicInfo = [
  {
    time_table: "",
    school_code: "",
    name: "",
    logo: "",
    social_media_links: "",
    address: "",
    contact_details: "",
    establishment_year: "",
  },
];

export const courses_offered = [
  {
    board_name: "",
    type: "Science",
    course: "PCMC" || "PCMB",
  },
  {
    board_name: "",
    type: "Commerce",
    course: "EBAC" || "EBAS",
  },
  {
    board_name: "",
    type: "Language",
    course: "Hindi" || "English",
  },
];
