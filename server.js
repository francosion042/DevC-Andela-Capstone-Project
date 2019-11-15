const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// @Middlewares
// @Api Routes for users, Gifs, and Articles

//@body parser middleware for getting the body content of the form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//@API routes for users
app.use("/api/v1", require("./Routes/users"));

//@API routes for articles
app.use("/api/v1", require("./Routes/articles"));

//@API routes for Gifs
app.use("/api/v1", require("./Routes/gifs"));

//@API routes for gif and article comments
app.use("/api/v1", require("./Routes/comments"));

//@API route for feed
app.use("/api/v1", require("./Routes/feeds"));

app.use("/api/v1", require("./Routes/index"));

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
