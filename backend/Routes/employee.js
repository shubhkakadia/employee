const express = require("express");
var router = express();
const {
  create,
  read,
  readID,
  deleteEmp,
  update,
  filterEmployee,
} = require("../Controller/employee");

const bodyparser = require("body-parser");
router.use(bodyparser.json());
router.post("/create", create);
router.get("/get", read);
router.get("/get/:id", readID);
router.post("/delete/:id", deleteEmp);
router.put("/update", update);
router.get("/getbyfactory/:factory", filterEmployee);
module.exports = router;
