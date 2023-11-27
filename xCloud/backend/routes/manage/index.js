const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Ctrls } = require("../../controllers");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
// manage page
router.get("/", Ctrls.manage.renderManage);

router.post("/addProject", upload.single("project"), Ctrls.manage.addProject);

module.exports = router;
