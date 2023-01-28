const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({});
module.exports = mongoose.model("Task", TaskSchema);

let task = {
  assigned_date: "",
  submission_date: "",
  type: "",
  remarks_by_teacher: "",
  days_to_submit: 3, // 3 Days
  status: "TODO", // Todo , Progress , Finished
  verified_by: "Teacher",
  task_submitted: false,
  task_file: "", // Pdf
};
