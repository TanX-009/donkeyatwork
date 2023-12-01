const express = require("express");
const { controllers } = require("../../../controllers");

var router = express.Router();

// register user
router.post("/", controllers.account.register);

module.exports = router;
