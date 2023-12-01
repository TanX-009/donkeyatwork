var express = require("express");
const controllers = require("../../../controllers");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.status(200).json({ message: "" });
});

router.post("/", controllers.account.login);

module.exports = router;
