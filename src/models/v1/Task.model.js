const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    assigned_date: {
      type: Date,
      default: Date.now(),
    },
    submission_date: {
      type: Date,
      default: Date.now(),
    },
    type: [
      {
        _id: false,
        task_name: {
          type: String,
          enum: ["Punishment", "HomeWork"],
        },
      },
    ],
    remarks_by_teacher: {
      type: String,
      maxlength: 50,
      required: [true, "Please enter the remark"],
    },
    days_to_submit: {
      type: Number,
      max: [5, "Cannot be more than 5 days"],
      required: [true, " days_to_submit is missing"],
    },
    status: {
      type: String,
      default: "Todo",
      enum: ["Todo", "Progress", "Finished"],
    },
    verified_by: "Teacher",
    task_submitted: {
      type: Boolean,
      default: false,
    },
    task_file: {
      // Pdf
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Task", TaskSchema);
