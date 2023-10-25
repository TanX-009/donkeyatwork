var express = require("express");
const controllers = require("../../../controllers");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("account/forgot_password", { message: "" });
});

router.post("/", controllers.account.login);

module.exports = router;
