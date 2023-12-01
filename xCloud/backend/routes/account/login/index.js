var express = require("express");
const { controllers } = require("../../../controllers");
var router = express.Router();

// login
router.post("/", controllers.account.login);

module.exports = router;
