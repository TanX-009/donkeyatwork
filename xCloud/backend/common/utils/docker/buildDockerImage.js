const { promisify } = require("util");
const Docker = require("dockerode");

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

const buildImageAsync = promisify(docker.buildImage);

export async function buildImage(imageName, dirName) {
  try {
    const buildContext = `${process.cwd()}/${dirName}`;
    console.log(buildContext);

    await buildImageAsync(
      {
        context: buildContext,
        src: ["Dockerfile", "/"],
      },
      { t: imageName },
    );

    console.log(`Docker image ${imageName} built successfully.`);
  } catch (error) {
    console.error("Error building Docker image:", error);
    process.exit(1);
  }
}
