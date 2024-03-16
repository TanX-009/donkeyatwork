const decompress = require("decompress");
const Docker = require("dockerode");
const {
  rmSync,
  readFileSync,
  existsSync,
  unlinkSync,
  writeFileSync,
} = require("fs");
const path = require("path");
const { query } = require("../../../db");

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

// -------------------------------------------------------------------->
// Response step (5)
// -------------------------------------------------------------------->

async function response(req, res, inputFields, network_id, main_container_id) {
  // add project to the database
  await query(`
    INSERT INTO projects (account_id, project_name, network_id, main_container_id)
    VALUES ('${inputFields.user._id}', '${inputFields.main.project_name}', '${network_id}', '${main_container_id}');
  `);

  // return response to user
  return res.status(200).json({ msg: "Docker image built sucessfully." });
}

// -------------------------------------------------------------------->
// Container creation step (4)
// -------------------------------------------------------------------->

function startContainer(
  req,
  res,
  container,
  inputFields,
  network_id,
  main_container_id,
) {
  container.start((startErr) => {
    if (startErr) {
      console.error("Error starting container:", startErr);
      process.exit(1);
    }
    // move to step 5
    response(req, res, inputFields, network_id, main_container_id);
  });
}

function createContainer(
  req,
  res,
  dockerImageName,
  projectName,
  inputFields,
  network_id,
) {
  const containerOptions = {
    Image: dockerImageName,
    Cmd: ["npm", "run", "start"],
    ExposedPorts: { [`${inputFields.main.port}/tcp`]: {} },
    HostConfig: {
      PortBindings: {
        [`${inputFields.main.port}/tcp`]: [{ HostPort: "0" }],
      },
      NetworkMode: projectName,
    },
  };
  // create docker container
  docker.createContainer(containerOptions, (containerErr, container) => {
    if (containerErr) {
      console.error("Error creating container:", containerErr);
      process.exit(1);
    }
    const main_container_id = container.id;

    // Start the container
    startContainer(
      req,
      res,
      container,
      inputFields,
      network_id,
      main_container_id,
    );
  });
}

// -------------------------------------------------------------------->
// Network creation step (3)
// -------------------------------------------------------------------->

function createDockerNetwork(
  req,
  res,
  dockerImageName,
  projectName,
  inputFields,
) {
  docker.createNetwork({ Name: projectName }, (networkErr, network) => {
    if (networkErr && networkErr.statusCode !== 409) {
      console.error("Error creating network:", networkErr);
      process.exit(1);
    }

    // move to step 4
    createContainer(
      req,
      res,
      dockerImageName,
      projectName,
      inputFields,
      network.id,
    );
  });
}

// -------------------------------------------------------------------->
// Image creation step (2)
// -------------------------------------------------------------------->

function monitorBuildProcess(
  req,
  res,
  tempDirName,
  inputFields,
  dockerImageName,
  projectName,
  stream,
) {
  // Log build progress
  docker.modem.followProgress(stream, (err) => {
    if (err) {
      console.error("Error building Docker image:", err);
    } else {
      // image is built

      // clean the uploaded files
      rmSync(tempDirName, { recursive: true });

      // move to step 3
      createDockerNetwork(req, res, dockerImageName, projectName, inputFields);
    }
  });
}

function buildImage(req, res, tempDirName, inputFields) {
  // create unique projectname
  const projectName =
    `${inputFields.user.username}${inputFields.user._id}${inputFields.main.project_name}`.replace(
      " ",
      "",
    );
  const dockerImageName = projectName + "_main";

  const buildContext = `${process.cwd()}/${tempDirName}`;
  console.log(buildContext);

  docker.buildImage(
    {
      context: buildContext,
      src: ["Dockerfile", "/"],
    },
    { t: dockerImageName },
    (error, stream) => {
      if (error) {
        console.error("Error building Docker image:", error);
        process.exit(1);
      }

      monitorBuildProcess(
        req,
        res,
        tempDirName,
        inputFields,
        dockerImageName,
        projectName,
        stream,
      );
    },
  );
}

function createDockerfile(tempDirName, inputFields) {
  // content of the docker file used to create the image
  const dockerfileContent = `
    FROM node
    WORKDIR ${tempDirName}
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE ${inputFields.main.port}
    CMD ["npm", "run", "start"]
  `;

  writeFileSync(`${tempDirName}/Dockerfile`, dockerfileContent);
}

function imageCreation(req, res, tempDirName, inputFields) {
  // create Dockerfile
  createDockerfile(tempDirName, inputFields);

  // build the image
  buildImage(req, res, tempDirName, inputFields);
}

// -------------------------------------------------------------------->
// Decompression step (1)
// -------------------------------------------------------------------->

function handleDecompression(req, res, tempDirName, inputFields) {
  // delete the zip file after decompression
  unlinkSync(req.file.path, (err) => {
    if (err) console.error(err);
  });

  // check if the file exists
  if (!existsSync(tempDirName + "/package.json")) {
    rmSync(tempDirName, { recursive: true });
    return res
      .status(201)
      .json({ msg: "'package.json' doesn't exist directly in the zip" });
  }

  // get start script from package.json
  const packageJSON = readFileSync(tempDirName + "/package.json", "utf-8");
  const startScript = JSON.parse(packageJSON).scripts.start;

  // check if the script named start exists
  if (!startScript) {
    return res
      .status(201)
      .json({ msg: "'package.json' doesn't contain start script" });
  }

  // move to step 2
  imageCreation(req, res, tempDirName, inputFields);
}

async function decompression(req, res, tempDirName, inputFields) {
  await decompress(req.file.path, tempDirName)
    .then(() => {
      handleDecompression(req, res, tempDirName, inputFields);
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = async (req, res) => {
  try {
    // decompress uploaded zip into temporary folder
    const tempDirName = req.file.path.replace(".zip", "");
    const inputFields = JSON.parse(req.body.data);

    // check if the project exists
    const checkProjects = await query(
      `SELECT * FROM projects 
        WHERE 
          account_id = '${inputFields.user._id}' 
          AND 
          project_name = '${inputFields.main.project_name}';`,
    );

    // if the project exists, return
    if (checkProjects.rowCount !== 0) {
      return res.status(201).json({
        msg: "Project already exists!",
      });
    }

    // move to step 1
    await decompression(req, res, tempDirName, inputFields);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Error while creating project: " + error,
    });
  }
};
