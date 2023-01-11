const express = require("express");
var router = express();
const {
  create,
  read,
  readEmail,
  deleteUser,
  update,
} = require("../Controller/user");

const bodyparser = require("body-parser");
router.use(bodyparser.json());
router.post("/create", create);
router.get("/get", read);
router.get("/getuser/:email", readEmail);
router.post("/delete", deleteUser);
router.put("/update", update);
module.exports = router;
