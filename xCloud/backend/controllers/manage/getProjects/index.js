const Docker = require("dockerode");
const { query } = require("../../../db");

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

async function inspectContainer(container, update) {
  try {
    // Wrap the callback-based function in a Promise
    const inspectPromise = () => {
      return new Promise((resolve, reject) => {
        container.inspect((err, data) => {
          if (err && err.statusCode === 404) {
            data = {
              State: { Running: false, Status: "Container doesn't exist!" },
            };
            resolve(data);
          } else if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    };

    // Use await with the wrapped function to get information about the container
    const data = await inspectPromise();

    let msg = "";
    let state = data.State.Status;
    let port = "";

    if (data.State.Running) {
      // set state and port
      port = Object.values(Object.values(data.NetworkSettings.Ports)[0][0])[1];
      // set message as running
      msg = "Running on port: " + port;
    } else if (state === "exited") {
      // set message as stopped
      msg = "Stopped";
    } else {
      msg = state;
    }

    // callback to add msg to projects
    update(msg, state);
  } catch (error) {
    console.error("Error inspecting container:", error);
  }
}

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    // get projects related to user id
    const projectsRaw = await query(
      `SELECT * FROM projects 
        WHERE 
          account_id = '${id}';`,
    );

    const projects = projectsRaw.rows;

    // iterate to add container state
    for (let i = 0; i < projects.length; i++) {
      const container = docker.getContainer(projects[i].main_container_id);

      // get container state
      await inspectContainer(container, (msg, state) => {
        projects[i].msg = msg;
        projects[i].state = state;
      });
    }

    return res.status(200).json({ data: projects });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Error while getting projects.",
    });
  }
};
