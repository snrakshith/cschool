// Campus Infrastructure and Faculties

const mongoose = require("mongoose");
const { Schema } = mongoose;

const CampusOverviewSchema = new Schema({
  transportation: {
    type: Boolean,
    default: true,
  },
  drinking_water: {
    type: Boolean,
    default: true,
  },
  cctv_surveillance: {
    type: Boolean,
    default: false,
  },
  fire_safety_code: {
    type: Boolean,
    default: true,
  },
  inhouse: {
    doctor_or_medical_practitioner: {
      type: Boolean,
      default: false,
    },
    career_counsler: {
      type: Boolean,
      default: false,
    },
    internet_enabled_campus: {
      type: Boolean,
      default: false,
    },
    ac_enabled_classrooms: {
      type: Boolean,
      default: false,
    },
  },
  sports: {
    indoor: {
      type: Boolean,
      default: false,
    },
    outdoor: {
      type: Boolean,
      default: false,
    },
    swimming_pool: {
      type: Boolean,
      default: false,
    },
    amphitheatre: {
      type: Boolean,
      default: false,
    },
  },
  smart_classes: {
    type: Boolean,
    default: false,
  },
  dining_hall_or_food_court_or_cafeteria: {
    type: Boolean,
    default: true,
  },
  book_store: {
    type: Boolean,
    default: true,
  },
  laundry_service: {
    type: Boolean,
    default: false,
  },
  campus_elections: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("CampusOverview", CampusOverviewSchema);
