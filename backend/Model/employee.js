const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: true,
    unique: true,
  },
  Factory: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
  },
  PhoneNo: {
    type: Number,
  },
  DoB: {
    type: Date,
  },
  AdhaarNo: {
    type: Number,
  },
  Reference: {
    type: String,
  },
  Address: {
    type: String,
  },
  Village: {
    type: String,
  },
  VillageAddress: {
    type: String,
  },
  JoinDate: {
    type: Date,
  },
  LeaveDate: {
    type: Date,
  },
  Photo: {
    data: Buffer,
    type: String,
  },
  StillWorking: {
    type: String,
  },
  BankName: {
    type: String,
  },
  IFSC: {
    type: String,
  },
  AccountNo: {
    type: String,
  },
  Note: {
    type: String,
  },
});
module.exports = mongoose.model("employeedatas", employeeSchema);
