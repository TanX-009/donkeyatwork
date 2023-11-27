var express = require("express");
var router = express.Router();

// api route
router.use("/api", require("./api"));

/* Login page. */
router.use("/login", require("./account/login"));
router.use("/register", require("./account/register"));

// management page
router.use("/", require("./manage"));

module.exports = router;
