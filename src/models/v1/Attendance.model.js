let attendance = [
  {
    student_name: "Rashi",
    current_date: "05-02-2021",
    is_present: true,
    recorded_info: {
      // attendance taken by `classteacher` or anyone if classteacher is absent
      conducted_by: "class teacher",
      time_in_hours: "11:17",
      hour_conventions: "am", // `am or pm`
      name: "Raju Sir",
    },
    leave_req: {}, // if is_present:`true` then leave_req is `empty {}`
  },
];

let leaveReq = {
  leave_type: "Range", // `Single` , `Range`
  leave_date: "",
  date_range: {
    from: "28-09-2022",
    to: "30-09-2022",
  },
  total_days: 2,
  reason: "Sisters Marriage",
  leave_status: "Rejected", // Approved ,by default set to `Rejected`
  is_granted: false, // is_approved by default set to `false`
  class_teacher: "", // students class_teacher name
  req_id: "", // system generated
};
