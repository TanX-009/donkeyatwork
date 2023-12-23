const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "xcloud",
  password: "come@mebro",
  port: 5432,
});

module.exports.query = (text) => pool.query(text);
