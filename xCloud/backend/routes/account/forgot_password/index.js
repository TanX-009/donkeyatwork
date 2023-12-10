var express = require("express");
const { controllers } = require("../../../controllers");
var router = express.Router();

router.post("/", controllers.account.forgot_password);

module.exports = router;
