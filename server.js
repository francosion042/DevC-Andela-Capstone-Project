const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const CORS = require("cors");

// @Middlewares
// @Api Routes for users, Gifs, and Articles

//app.use(CORS);
//@body parser middleware for getting the body content of the form
app.use(bodyParser.json());

//@API routes for article
//@users can post Article
//@----------get specific article
//@----------update article
//@----------Delete article

app.use("/api/v1", require("./Routes/articles"));

//@API routes for Gifs
//@users can post Gif
//@----------get specific gif
//@----------update gif
//@----------Delete gif
app.use("/api/v1", require("./Routes/gifs"));
app.use("/api/v1", require("./Routes/comments"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
