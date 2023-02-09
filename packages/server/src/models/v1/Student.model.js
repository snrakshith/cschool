const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  tasks_assigned: {
    tasks: [
      // Tasks Obj
      {
        _id: false,
        task_name: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Task",
        },
      },
    ],
    details: {
      total_tasks: {
        type: Number,
      },
      cancelled_tasks: {
        type: Number,
      },
    },
  },
});
let student = {
  name: "",
  school_id: "",
  teacher_id: "",
  org_id: "",
  profile: {
    blood_group: "",
    photo: "",
    email_id: "",
    age: "",
    gender: "",
  },
  gaurdian_details: {
    name: "",
    phone_number: "",
    relationship: "",
    address: {
      site: "",
      landmark: "", // Optional
      pincode: "",
      state: "",
    },
  },
  education: {
    class: "5th std",
    section: "B",
    roll_number: 21,
  },
  proof_name: "",
  proof_doc: "",
  // performance insights
  perf_insights: {
    achedmic: {
      total_no_working_days: 274,
      total_no_leaves: 14,
      attendance_percentage: 84.7,
    },
    non_achedmic: {
      sports_awards: 2,
    },
  },
  attendance: {},
  tasks_assigned: {
    tasks: [
      // Tasks Obj
    ],
    details: {
      total_tasks: 10,
      cancelled_tasks: 2,
      active_tasks: 1, // current
      pending_tasks: 2, // need to take up
      completed_tasks: 5,
    },
  },
};

module.exports = mongoose.model("Student", StudentSchema);
