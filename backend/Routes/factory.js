const express = require("express");
var router = express();
const {
  create,
  read,
  readFactory,
  deleteFactory,
  update,
  readAllFactoryEmployee,
} = require("../Controller/factory");

const bodyparser = require("body-parser");
router.use(bodyparser.json());
router.post("/create", create);
router.get("/get", read);
router.get("/get/:name", readFactory);
router.post("/delete", deleteFactory);
router.put("/update", update);
router.get("/allfactoryemployee", readAllFactoryEmployee);
module.exports = router;
