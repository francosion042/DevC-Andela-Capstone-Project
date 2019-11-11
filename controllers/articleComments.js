const pool = require(".././DBConfig/dbconfig");

//creating comment fora specific article
exports.postComment = (req, res) => {
  const { comment } = req.body,
    { id } = req.params;
  const dateTime = new Date().toString();

  pool
    .query("INSERT INTO articlecomments (comment_id,comment) VALUES ($1,$2)", [
      id,
      comment
    ])

    .then(() => {
      pool
        .query("SELECT * FROM articles WHERE id = $1", [id])
        .then(selectResult => {
          res.status(201).json({
            status: "success",
            data: {
              message: "Comment successfully created",
              createdOn: dateTime,
              articleTitle: selectResult.rows[0].title,
              article: selectResult.rows[0].article
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
    .query(
      "DELETE FROM articlecomments WHERE comment_id = $1 AND pri_id = $2",
      [id1, id2]
    )
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
