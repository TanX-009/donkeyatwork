var express = require("express");
var router = express.Router();

// api route
router.use("/api", require("./api"));

/* Login page. */
router.use("/login", require("./account/login"));
router.use("/register", require("./account/register"));
router.use("/deploy", require("./deploy"));

module.exports = router;
