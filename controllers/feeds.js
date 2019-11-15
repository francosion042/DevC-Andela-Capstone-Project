const pool = require(".././DBConfig/dbconfig");

exports.getFeeds = (req, res) => {
  pool.query("SELECT * FROM articles ORDER BY id Desc").then(articleResults => {
    pool.query("SELECT * FROM gifs ORDER BY id Desc").then(gifResults => {
      res.status(200).json({
        status: "success",
        data: [articleResults.rows, gifResults.rows]
      });
    });
  });
};
//add an authorid column to both articles, gifs and comments tables, this will be a foreign key to reference the author
