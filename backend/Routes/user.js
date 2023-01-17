const express = require("express");
const auth = require("../auth");
var router = express();
const {
  register,
  read,
  readEmail,
  deleteUser,
  update,
  login,
  freeContent,
  authorisedContent,
} = require("../Controller/user");

const bodyparser = require("body-parser");
router.use(bodyparser.json());
router.post("/register", register);
router.post("/login", login);
router.get("/freecontent", freeContent);
router.get("/authorisedcontent", auth, authorisedContent);
router.get("/get", read);
router.get("/getuser/:email", readEmail);
router.post("/delete", deleteUser);
router.put("/update", update);
module.exports = router;
