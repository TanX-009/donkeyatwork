const { writeFileSync } = require("fs");

export default function createDockerfile(dirName, type = "node", params) {
  const dockerfileTypes = {
    node: `
    FROM node
    WORKDIR ${dirName}
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE ${params.port}
    CMD ["npm", "run", "start"]
    `,
  };

  writeFileSync(`${dirName}/Dockerfile`, dockerfileTypes[type]);
}
