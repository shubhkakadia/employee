const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    EmployeeList: {
      type: Array,
    },
    Factory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("attendancedatas", attendanceSchema);
