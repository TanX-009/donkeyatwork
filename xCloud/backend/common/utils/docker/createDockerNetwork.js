const { promisify } = require("util");
const Docker = require("dockerode");

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

const createNetworkAsync = promisify(docker.createNetwork);

export default function createDockerNetwork(networkName) {
  return new Promise((resolve, reject) => {
    createNetworkAsync({ Name: networkName })
      .then((network) => {
        console.log("Network created:", network);
        resolve(network);
      })
      .catch((error) => {
        if (error.statusCode && error.statusCode !== 409) {
          console.error("Error creating network:", error);
          reject(error);
        }
      });
  });
}
