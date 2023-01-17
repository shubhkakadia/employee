const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
  },
  Password: {
    type: String,
    required: true,
  },
  Photo: {
    data: Buffer,
    type: String,
  },
  Token: {
    type: String,
  },
});
module.exports = mongoose.model("userdatas", userSchema);
