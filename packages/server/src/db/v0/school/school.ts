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

// Campus Infrastructure and Faculties
const campus_overview = {
  transportation: true,
  drinking_water: true,
  cctv_surveillance: false,
  fire_safety_code: true,
  inhouse: {
    doctor_or_medical_practitioner: false,
    career_counsler: false,
    internet_enabled_campus: false,
    ac_enabled_classrooms: false,
  },
  sports: {
    indoor: false,
    outdoor: false,
    swimming_pool: false,
    amphitheatre: false,
  },
  smart_classes: false,
  dining_hall_or_food_court_or_cafeteria: true,
  book_store: true,
  laundry_service: false,
  campus_elections: true,
};

const glance_view = {
  popular_alumnis: [
    {
      name: "Rajinikanth",
      academic_profile: [
        {
          standard: 5,
          section: "B",
          roll_number: 51,
          academic_year: {
            from_date: "29-01-1997",
            to_date: "5-02-1998",
          },
        },
      ],
    },
  ],
  recent_achievements: [
    {
      event_info: {
        name: "State Chess Compainship",
        date: "",
        participants: [{}],
        status: "Winner",
        assets: {
          images: [],
          videos: [],
        },
      },
      statement_after_achievement: [
        {
          achiever_name: "Ramesh",
          role: "teacher",
          statement: "",
        },
      ],
    },
  ],
  reviews: [
    {
      username: "Rakshith",
      medium: "google",
      rating: 5,
      comment: "Good school",
      date: "06-02-2005",
    },
  ],
  brochure: [
    {
      topic: "Hostal life",
      published_date: "06-05-2021",
      link: "https://www.dummy.com/",
    },
  ],
  foundation_statement: [
    {
      role: "Principal",
      for_academic_year: "2021-2022",
      published_date: "06-07-2021",
      link: "https://www.dummy.com/",
    },
  ],
  ratios: {
    teacher_to_students: "1:30",
    acceptency: "5%",
  },
};
