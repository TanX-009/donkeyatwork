const express = require("express");
const router = express.Router();
const multer = require("multer");
const { verifyUser } = require("../../common/Auth");
const { controllers } = require("../../controllers");
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

router.post(
  "/add_project",
  upload.single("file"),
  controllers.manage.addProject,
);

/* GET users projects. */
router.get("/get_projects/:id", verifyUser, controllers.manage.getProjects);

// delete project
router.post("/delete_project", verifyUser, controllers.manage.deleteProject);

// stop project
router.post("/stop_project", verifyUser, controllers.manage.stopProject);

// start project
router.post("/start_project", verifyUser, controllers.manage.startProject);

module.exports = router;
