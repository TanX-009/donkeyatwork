var express = require("express");
const { Login } = require("../../data");
const { loginStatus } = require("../../data/login");
var router = express.Router();

// deploy page
router.get("/", function(req, res, next) {
  if (!Login.loginStatus) {
    res.redirect("/login");
  } else res.send("deploy");
});

module.exports = router;
