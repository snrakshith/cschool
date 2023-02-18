const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchoolSchema = new Schema({});

/**
 * String
 * Date
 * Array
 * Array of Objects
 * Numbers
 */

// V2
/**
 * String
 * Date
 * Array
 * Array of Objects
 * Numbers
 * Phone Number
 *   - only numbers
 *   - 10 digits
 * Email_id
 * Pictures of school ( multi image )
 * School Logo   ( single image )
 * Application Form  ( file )
 * location of the school  ( obj of geo )
 * School Id "System Generated / Create manually"
 */

let school = {
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
      eligebality_critery: "above 10 years",
      class_from: "1 to 10",
    },
    {
      board: "state_board",
      eligebality_critery: "above 10 years",
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
};

// API for School Service

/**
 * - create new school
 * - search by school ie., name or id
 * - change school type
 * - get all schools
 * - get single school by id
 * - patch `course_offered` by school
 * - put update school
 *      - email_id
 *      - phone_number
 * - delete / disable school
 * - get all active schools
 * - get all not_active schools
 * - get counters
 *      - total number of schools
 *      - total number of active schools
 *      - total number of non_active schools
 *      - total number of schools with boarding facility
 * - counters_range  `30days` ,`6 months` ,`year`
 */

//  Aggregation API of counters_data && school_data

let data = {
  homepage_data: {
    counters: {},
    school_data: {}, // get all active schools
    school_data: SchoolSchema, // get all active schools
  },
};

module.exports = mongoose.model("School", SchoolSchema);
