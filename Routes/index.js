const express = require("express");
const app = express();
const articleRoute = require("./articles");
const gifRoute = require("./gifs");

app.use("/api/v1", articleRoute);

app.use("/api/v1", gifRoute);

// app.listen(3000, () => {
//   console.log("App listening on port 3000!");
// });

module.exports = app;
