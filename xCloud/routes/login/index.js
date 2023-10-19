var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("account/login", { title: "Login", lobin: "asdfasdfasdf" });
});

module.exports = router;
