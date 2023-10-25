const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "xCloud",
  password: "come@mebro",
  port: 5432,
});

module.exports.query = (text) => {
  return pool.query(text);
};
