const decompress = require("decompress");
const Docker = require("dockerode");
const { unlink, rmSync, readFileSync, existsSync, unlinkSync } = require("fs");
const path = require("path");

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

module.exports.addProject = async (req, res) => {
  try {
    // decompress uploaded zip into temporary folder
    const tempDirName = req.file.path.replace(".zip", "");
    await decompress(req.file.path, tempDirName)
      .then(() => {
        // delete the zip file after decompression
        unlinkSync(req.file.path, (err) => {
          if (err) console.error(err);
        });

        // check if the file exists
        if (existsSync(tempDirName + "/package.json")) {
          // get start script from package.json
          const packageJSON = readFileSync(
            tempDirName + "/package.json",
            "utf-8",
          );
          const startScript = JSON.parse(packageJSON).scripts.start;
          // check if the script named start exists
          if (startScript) {
            console.log(startScript);
          } else {
            return res
              .status(201)
              .json({ msg: "'package.json' doesn't contain start script" });
          }

          rmSync(tempDirName, { recursive: true });
        } else {
          rmSync(tempDirName, { recursive: true });
          return res
            .status(201)
            .json({ msg: "'package.json' doesn't exists directly in the zip" });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    return res.status(400).json({
      error: "Error while creating project",
    });
  }
};
