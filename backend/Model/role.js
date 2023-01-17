const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  RoleName: {
    type: String,
    required: true,
    unique: true,
  },
  DailyWages: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("roledatas", roleSchema);
