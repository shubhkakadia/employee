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
  update,
  getByFactory,
  getByFactoryAndDate,
} = require("../Controller/attendance");

const bodyparser = require("body-parser");
router.use(bodyparser.json());

router.post("/create", create);
router.put("/update", update);
router.post("/getbyfactoryanddate", getByFactoryAndDate);
router.get("/getbyfactory/:factory", getByFactory);
router.get("/get", get);
router.post("/getdate", getDate);
router.post("/getmonth", getMonth);
router.post("/getyear", getYear);
router.post("/getemployeedata", getEmployeeData);
router.put("/addemployeedata", addEmployeeDate);
router.put("/removeemployeedata", removeEmployeeDate);

module.exports = router;
