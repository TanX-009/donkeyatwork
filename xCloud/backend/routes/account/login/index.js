var express = require("express");
const { Login } = require("../../../data");
const { Ctrls } = require("../../../controllers");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  if (Login.status) return res.redirect("/manage");
  res.render("account/login", { message: "" });
});

router.post("/", Ctrls.account.login);

module.exports = router;
