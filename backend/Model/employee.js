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
    required: true,
  },
  PhoneNo: {
    type: Number,
    require: true,
  },
  DoB: {
    type: Date,
    require: true,
  },
  AdhaarNo: {
    type: Number,
    require: true,
  },
  Reference: {
    type: String,
  },
  Address: {
    type: String,
    require: true,
  },
  Village: {
    type: String,
    require: true,
  },
  VillageAddress: {
    type: String,
    require: true,
  },
  JoinDate: {
    type: Date,
    require: true,
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
    type: Number,
  },
  AccountNo: {
    type: Number,
  },
  Note: {
    type: String,
  },
});
module.exports = mongoose.model("employeedatas", employeeSchema);
