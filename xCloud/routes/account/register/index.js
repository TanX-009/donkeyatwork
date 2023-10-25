const express = require("express");
const controllers = require("../../../controllers");
const { Login } = require("../../../data");

var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
  if (Login.status) return res.redirect("/deploy");
  res.render("account/register", { message: "" });
});

router.post("/", controllers.account.register);

module.exports = router;
