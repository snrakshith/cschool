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
    moto: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: [true, "Website is required"],
    },
    code: {
      type: String,
      required: [true, "School code is required"],
    },
    school_id: String,
    phone_number: {
      type: String,
      minlength: [1, "Cannot be less than 1 character"],
      maxlength: [10, "Cannot be excede more than 10 character"],
      required: [true, "phone is required"],
    },
    number: {
      type: [Number],
      required: [true, "phone is required"],
    },
    email: {
      type: String,
      trim: true,
      // unique: [true, "Must be unique"],
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
    // Array of objects
    labs: [
      {
        _id: false,
        lab_name: {
          type: String,
          enum: ["Physics lab"],
        },
      },
    ],
    criterias: [
      {
        criteriaName: { type: String },
        criteriaStatus: { type: Boolean, default: true },
      },
    ],
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
        languageName: {
          type: String,
          enum: ["English", "Kannada"],
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

SchoolSchema.pre("save", function (next) {
  this.school_id = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("School", SchoolSchema);
