const Pool = require("pg").Pool;

module.exports.pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "xCloud",
  password: "come@mebro",
  port: 5432,
});
