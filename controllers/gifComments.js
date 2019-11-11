const pool = require(".././DBConfig/dbconfig");

exports.postComment = (req, res) => {
  const { comment } = req.body,
    { id } = req.params;
  const dateTime = new Date().toString();
  pool
    .query("INSERT INTO gifcomments (comment_id, comment) VALUES ($1, $2)", [
      id,
      comment
    ])
    .then(() => {
      pool
        .query("SELECT * FROM gifs WHERE id = $1", [id])
        .then(selectResult => {
          res.status(201).json({
            status: "success",
            data: {
              message: "Comment successfully created",
              createdOn: dateTime,
              gifTitle: selectResult.rows[0].title

              // comment: insertResult.rows[0].comment
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
};

exports.deleteComment = (req, res) => {
  const { id1, id2 } = req.params;
  pool
    .query("DELETE FROM gifcomments WHERE comment_id = $1 AND pri_id = $2", [
      id1,
      id2
    ])
    .then(() => {
      res.status(200).json({
        status: "Success",
        data: {
          message: "Comment successfully deleted",
          comment_id: id1,
          pri_id: id2
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};
