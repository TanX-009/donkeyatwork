const express = require("express");
const { Login } = require("../../../data");
const { Ctrls } = require("../../../controllers");

var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
  if (Login.status) return res.redirect("/manage");
  res.render("account/register", { message: "" });
});

router.post("/", Ctrls.account.register);

module.exports = router;
