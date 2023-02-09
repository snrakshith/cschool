// import mongoose, { model } from "mongoose";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeacherSchema = new Schema({
  name: String,
  school_id: String,
  teacher_id: String,
  org_id: String,
});

let teacher = {
  name: "",
  school_id: "",
  teacher_id: "",
  org_id: "",
  profile: {
    blood_group: "",
    photo: "",
    email_id: "",
    age: "",
    phone_number: "",
    gender: "",
    expertised_fields: "",
    experience: "",
    prefereed_mode_of_communication: "Email",
  },
  address: {
    site: "",
    landmark: "", // Optional
    pincode: "",
    state: "",
  },
  attendance: {},
  proof_name: "",
  proof_doc: "",
};

module.exports = mongoose.model("Teacher", TeacherSchema);
