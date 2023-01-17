const express = require("express");
var router = express();
const { create, read, updateRole, deleteRole } = require("../Controller/role");

const bodyparser = require("body-parser");
router.use(bodyparser.json());
router.post("/create", create);
router.get("/get", read);
router.put("/update", updateRole);
router.post("/delete/", deleteRole);

module.exports = router;
