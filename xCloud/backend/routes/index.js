var express = require("express");
var router = express.Router();

// Login
router.use("/login", require("./account/login"));

// Register
router.use("/register", require("./account/register"));

// Forgot password
router.use("/forgot_password", require("./account/forgot_password"));

// management page
router.use("/manage", require("./manage"));

module.exports = router;
