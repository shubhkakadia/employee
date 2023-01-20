const express = require("express");
var router = express();
const {
  create,
  get,
  getDate,
  getMonth,
  getYear,
  getEmployeeData,
  addEmployeeDate,
  removeEmployeeDate,
} = require("../Controller/attendance");

const bodyparser = require("body-parser");
router.use(bodyparser.json());

router.post("/create", create);
router.get("/get", get);
router.get("/getdate", getDate);
router.get("/getmonth", getMonth);
router.get("/getyear", getYear);
router.get("/getemployeedata", getEmployeeData);
router.put("/addemployeedata", addEmployeeDate);
router.put("/removeemployeedata", removeEmployeeDate);

module.exports = router;
