const Docker = require("dockerode");
const { query } = require("../../../db");

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

// ------------------------------------------------->
// Returning response removing step (4)
// ------------------------------------------------->

async function returnResponse(req, res) {
  const isDeleted = await query(
    `DELETE FROM projects WHERE _id = ${req.body.project._id}`,
  );
  if (!isDeleted) {
    console.error("Error deleting project: " + isDeleted);
  }

  return res
    .status(200)
    .json({ msg: "Project deleted sucessfully", status: "SUCESS" });
}

// ------------------------------------------------->
// Network removing step (3)
// ------------------------------------------------->

function deleteNetwork(req, res, network) {
  network.remove((err) => {
    if (err) {
      console.error("Error deleting network:", err);
    } else {
      // move to step 4
      returnResponse(req, res);
    }
  });
}

function networkRemoverStep(req, res) {
  const networkName =
    `${req.body.user.username}${req.body.user._id}${req.body.project.project_name}`.replace(
      " ",
      "",
    );

  // get network
  const network = docker.getNetwork(networkName);
  // delete network if it exists
  network.inspect((err) => {
    if (err && err.statusCode === 404) {
      // network doesn't exist
      // move to step 4
      returnResponse(req, res);
    } else if (err) {
      console.error("Error inspecting network:", err);
      // network exists
    } else {
      deleteNetwork(req, res, network);
    }
  });
}

// ------------------------------------------------->
// Image removing step (2)
// ------------------------------------------------->

function deleteImage(req, res, mainImage) {
  mainImage.remove((err) => {
    if (err) {
      console.error("Error deleting image: " + err);
    } else {
      // move to step 3
      networkRemoverStep(req, res);
    }
  });
}

function imageRemoverStep(req, res) {
  const mainImageName =
    `${req.body.user.username}${req.body.user._id}${req.body.project.project_name}_main`.replace(
      " ",
      "",
    );

  // get mainImage
  const mainImage = docker.getImage(mainImageName);
  // delete image if it exists
  mainImage.inspect((err) => {
    if (err && err.statusCode === 404) {
      // image doesn't exist
      // move to step 3
      networkRemoverStep(req, res);
    } else if (err) {
      console.error("Error inspecting image:", err);
      // image exists
    } else {
      deleteImage(req, res, mainImage);
    }
  });
}

// ------------------------------------------------->
// Container removing step (1)
// ------------------------------------------------->

function deleteContainer(req, res, mainContainer) {
  mainContainer.remove((err) => {
    if (err) {
      console.error("Error deleting container: " + err);
    }
    // move to step 2
    imageRemoverStep(req, res);
  });
}

function stopAndDeleteContainer(req, res, mainContainer) {
  mainContainer.stop((err) => {
    if (err) {
      console.error("Error stopping container: " + err);
    }

    deleteContainer(req, res, mainContainer);
  });
}

function containerRemoverStep(req, res) {
  const mainContainerId = req.body.project.main_container_id;

  // get mainContainer
  const mainContainer = docker.getContainer(mainContainerId);
  // delete container if it exists
  mainContainer.inspect((err, data) => {
    if (err && err.statusCode === 404) {
      // container doesn't exist
      // move to step 2
      imageRemoverStep(req, res);
    } else if (err) {
      console.error("Error inspecting container:", err);
      // container exists
      // container is running
    } else if (data.State.Running) {
      stopAndDeleteContainer(req, res, mainContainer);
      // container is not running
    } else {
      deleteContainer(req, res, mainContainer);
    }
  });
}

module.exports = async (req, res) => {
  try {
    // move to step 1
    containerRemoverStep(req, res);
  } catch (error) {
    return res.status(400).json({
      error: "Error while deleting project: " + error,
      status: "FAILED",
    });
  }
};
