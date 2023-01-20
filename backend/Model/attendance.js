const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true,
    unique: true,
  },
  EmployeeList: {
    type: Array,
  },
});
module.exports = mongoose.model("attendancedatas", attendanceSchema);
