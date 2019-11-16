const pool = require("../DBConfig/dbconfig");
const { dataUri } = require("../middleware/multerUploads");
const { uploader } = require("../config/cloudinaryConfig");

//@posting a new gif
exports.postGif = (req, res) => {
  const { title } = req.body;
  const dateTime = new Date().toString();

  if (req.file) {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then(imagelink => {
        const image = imagelink.url;
        pool
          .query(
            "INSERT INTO gifs (image, title, createdon) VALUES ($1, $2, $3)",
            [image, title, dateTime]
          )
          .then(() => {
            pool
              .query("SELECT * FROM gifs WHERE image = $1", [image])
              .then(results => {
                res.status(201).json({
                  status: "success",
                  data: {
                    gifId: results.rows[0].id,
                    message: "GIF image successfully posted",
                    createdOn: dateTime,
                    title: title,
                    imageUrl: image
                  }
                });
              })
              .catch(error => {
                res.status(400).json({
                  status: "error",
                  error: error
                });
              });
          })
          .catch(error => {
            res.status(400).json({
              status: "error",
              error: error
            });
          });
      })
      .catch(error => {
        res.status(400).json({
          status: "error",
          error: error
        });
      });
  }
};

//@getting a specific gif
exports.getGifById = (req, res) => {
  const { id } = req.params;

  pool
    .query("SELECT * FROM gifs WHERE id = $1", [id])
    .then(results => {
      pool
        .query("SELECT * FROM gifcomments WHERE comment_id = $1 ", [id])
        .then(commentResults => {
          res.status(200).json({
            status: "success",
            data: {
              id: results.rows[0].id,
              createdOn: results.rows[0].createdon,
              title: results.rows[0].title,
              url: results.rows[0].image,
              comments: commentResults.rows
            }
          });
        })
        .catch(error => {
          res.status(400).json({
            status: "error",
            error: error
          });
        });
    })
    .catch(error => {
      res.status(400).json({
        status: "error",
        error: error
      });
    });
};

//@function for gif updating
exports.updateGif = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (req.file) {
    const file = dataUri(req).content;
    return uploader.upload(file).then(imagelink => {
      const image = imagelink.url;

      pool
        .query("UPDATE gifs SET image = $1, title = $2 WHERE id =$3", [
          image,
          title,
          id
        ])
        .then(() => {
          res.status(201).json({
            status: "success",
            data: {
              gifId: id,
              message: "Article successfully updated",
              image: image,
              title: title
            }
          });
        })
        .catch(error => {
          res.status(400).json({
            status: "error",
            error: error
          });
        });
    });
  }
};

//@deleting a specific gif
exports.deleteGif = (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM gifs WHERE id = $1 ", [id])
    .then(() => {
      pool
        .query("DELETE FROM gifcomments WHERE comment_id = $1", [id])
        .then(() => {
          res.status(200).json({
            status: "success",
            data: {
              message: "gif post Successfully deleted"
            }
          });
        })
        .catch(error => {
          res.status(400).json({
            status: "error",
            error: error
          });
        });
    })
    .catch(error => {
      res.status(400).json({
        status: "error",
        error: error
      });
    });
};
