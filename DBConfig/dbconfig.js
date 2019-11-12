const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "DevCProject",
//   password: "@ElsTony24",
//   port: 5432
// });


//Connection to cloud database(ElephantSQL)
const pool = new Pool({
  user: "hjcjmicm",
  host: "salt.db.elephantsql.com",
  database: "hjcjmicm",
  password: "0R-AMFliTVui_QMnQI3WrYDQ-jPY2QbJ",
  port: 5432
});
console.log("Database Connected");
module.exports = pool;
