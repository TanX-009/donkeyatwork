var express = require("express");
const controllers = require("../../../controllers");
const { Login } = require("../../../data");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  if (Login.status) return res.redirect("/deploy");
  res.render("account/login", { message: "" });
});

router.post("/", controllers.account.login);

module.exports = router;
