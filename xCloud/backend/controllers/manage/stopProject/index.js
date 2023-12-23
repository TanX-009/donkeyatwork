const Docker = require("dockerode");
const { query } = require("../../../db");

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

// ------------------------------------------------->
// Response step (2)
// ------------------------------------------------->

function respondUser(req, res) {
  return res
    .status(200)
    .json({ msg: "Project stopped sucessfully!", status: "SUCESS" });
}

// ------------------------------------------------->
// stop container step (1)
// ------------------------------------------------->

function stopContainer(req, res, mainContainer) {
  mainContainer.stop((err) => {
    if (err) {
      console.error("Error stopping container: " + err);
    }
    // move to step 2
    respondUser(req, res);
  });
}

function containerStopperStep(req, res) {
  const mainContainerId = req.body.project.main_container_id;

  // get mainContainer
  const mainContainer = docker.getContainer(mainContainerId);
  // delete container if it exists
  mainContainer.inspect((err, data) => {
    if (err && err.statusCode === 404) {
      // container doesn't exist
      // handle non-existent container
      console.error("Container is non-existent!");
    } else if (err) {
      console.error("Error inspecting container:", err);
      // container exists
      // container is running
    } else if (data.State.Running) {
      // stop container
      stopContainer(req, res, mainContainer);
      // container isn't running
    } else {
      // respond user that container is not running
      return res.status(201).json({
        msg: "Project not running!",
        status: "SUCESS",
      });
    }
  });
}

module.exports = async (req, res) => {
  try {
    // move to step 1
    containerStopperStep(req, res);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Error while stopping project: " + error,
      status: "FAILED",
    });
  }
};
