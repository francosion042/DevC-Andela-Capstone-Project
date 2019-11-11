const pool = require(".././DBConfig/dbconfig");

//@posting a new gif
exports.postGif = (req, res) => {
  const { image, title } = req.body;
  const dateTime = new Date().toString();
  pool
    .query("INSERT INTO gifs (image, title, createdon) VALUES ($1, $2, $3)", [
      image,
      title,
      dateTime
    ])
    .then(results => {
      res.status(201).json({
        status: "success",
        data: {
          gifId: `${results.insertid}`,
          message: "GIF image successfully posted",
          createdOn: dateTime,
          title: title,
          imageUrl: image
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

//@getting a specific gif
exports.getGifById = (req, res) => {
  const { id } = req.params;

  pool
    .query("SELECT * FROM gifs WHERE id = $1", [id])
    .then(results => {
      res.status(200).json({
        status: "success",
        data: {
          id: results.rows[0].id,
          createdOn: results.rows[0].createdon,
          title: results.rows[0].title,
          url: String,
          comments: [
            {
              commentId: "Integer",
              authorId: "Integer",
              comment: String
            },
            {
              commentId: "Integer",
              useauthorIdrId: "Integer",
              comment: String
            }
          ]
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.updateGif = (req, res) => {
  const { id } = req.params;
  const { image, title } = req.body;

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
          message: "Article successfully updated",
          image: image,
          title: title
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

//@deleting a specific gif
exports.deleteGif = (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM gifs WHERE id = $1", [id])
    .then(() => {
      res.status(200).json({
        status: "success",
        data: {
          message: "gif post Successfully deleted"
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};
