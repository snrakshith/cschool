const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  board: {
    type: String,
    enum: ["icse", "cbse", "state_board"],
  },
  eligibility_critery: {
    type: String,
    maxlength: 50,
    required: true,
  },
  class_from: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
});
const SchoolSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    school_id: String,
    phone_number: {
      type: String,
      minlength: [1, "Cannot be less than 1 character"],
      maxlength: [10, "Cannot be excede more than 10 character"],
      required: [true, "phone is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "Must be unique"],
      required: [true, "email is required"],
    },
    address: {
      site: String,
      landmark: String, // Optional
      pincode: Number,
      state: String,
    },
    logo: {
      type: String,
      default: "no-logo.png",
    },
    careers: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other",
      ],
    },
    specialization: [
      {
        _id: false,
        specializationName: {
          type: String,
          enum: [
            "All Category",
            "General",
            "Cardiology",
            "Gynecology",
            "Dermatology",
            "Orthopedic",
            "Dental",
            "Eye",
          ],
        },
      },
    ],
    communication: {
      languages: [
        {
          _id: false,
          languageName: {
            type: String,
            enum: ["English", "Kannada"],
          },
        },
      ],
    },
    facility: [{ _id: false, facilityCode: { type: String } }],
    facilities: {
      type: [String],
      required: [true, "Please add the avaiable faliclites"],
      enum: ["library", "food_court", "washroom"],
    },
    // courses_offered: [
    courses_offered: {
      board: {
        type: String,
        enum: ["icse", "cbse", "state_board"],
      },
      eligibility_critery: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true,
      },
      class_from: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
      },
    },
    // ],
    scholarship_for_students: {
      //  By default it is false
      type: Boolean,
      default: false,
    },
    // number_of_students: {
    //   type: Number,
    //   required: [true, "Number of students are required"],
    // },
    // teacher_strength: {
    //   type: Number,
    //   required: [true, "Number of teachers are required"],
    // },
    school_rating: {
      // Can rate between `1 to 5` 5 being the highest
      type: Number,
      min: 1,
      max: 5,
    },
    school_type: {
      // Available only if `school_type` value is `boarding`
      type: String,
      enum: ["day_schooler", "boarding"],
      default: "day_schooler",
    },
    boarding_facilies: {
      food_menu: {
        type: String,
        enum: ["veg", "non_veg", "both"],
        default: "veg",
      },
      laundry_service: {
        //  By default it is true
        type: Boolean,
        default: true,
      },
      hostel_type: {
        type: String,
        enum: ["boys", "girls", "both"],
        default: "both",
      },
    },
    school_status: {
      //  By default it is true
      type: Boolean,
      default: true,
    },
    year_of_eastablisment: {
      type: Date,
      default: Date.now,
    },
    school_location: {
      lat: {
        type: Number,
        // index: "2dsphere",
      },
      long: {
        type: Number,
        // index: "2dsphere",
      },
    },
  },
  {
    timestamps: true,
  }
);

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
SchoolSchema.pre("save", function (next) {
  this.school_id = slugify(this.name, { lower: true });
  next();
});

// Geocode & create location field
// SchoolSchema.pre("save", async function (next) {
//   const loc = await geocoder.geocode(this.address);
//   this.school_location = {
//     lat: loc[0].longitude,
//     long: loc[0].latitude,
//   };

//   next();
// });
module.exports = mongoose.model("School", SchoolSchema);

// SchoolSchema.statics.
