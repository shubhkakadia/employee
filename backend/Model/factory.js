const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
    unique: true
  },
  Address: {
    type: String,
    required: true,
  },
  Photo: {
    data: Buffer,
    type: String,
  },
});
module.exports = mongoose.model("factorydatas", userSchema);
