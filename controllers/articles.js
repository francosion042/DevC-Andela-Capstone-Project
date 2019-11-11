const pool = require(".././DBConfig/dbconfig");

//@posting a new article
const postArticle = (req, res) => {
  const { title, article } = req.body;
  const dateTime = new Date().toString();
  pool
    .query(
      "INSERT INTO articles (title, article, createdon) VALUES ($1,$2,$3)",
      [title, article, dateTime]
    )
    .then(results => {
      console.log(results.rows);
      res.json({
        status: "success",
        data: {
          message: "Article successfully created",
          articleId: `${results}`,
          createdOn: dateTime,
          title: `${title}`
        }
      });
    });
};

const getArticleById = (req, res) => {
  console.log("reached 2");
  const { id } = req.params;
  pool
    .query("SELECT * FROM articles WHERE id = $1", [id])
    .then(results => {
      res.status(200).json({
        status: "success",
        data: {
          id: results.rows[0].id,
          createdOn: results.rows[0].createdon,
          title: results.rows[0].title,
          article: results.rows[0].article,
          comments: [
            {
              commentId: "Integer",
              comment: String,
              authorId: "Integer"
            },
            {
              commentId: "Integer",
              comment: String,
              authorId: "Integer"
            }
          ]
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

const updateArticle = (req, res) => {
  const { id } = req.params;
  const { title, article } = req.body;

  pool
    .query("UPDATE articles SET title = $1, article = $2 WHERE id =$3", [
      title,
      article,
      id
    ])
    .then(() => {
      res.status(201).json({
        status: "success",
        data: {
          message: "Article successfully updated",
          title: title,
          article: article
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

const deleteArticle = (req, res) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM articles WHERE id = $1", [id])
    .then(() => {
      res.status(200).json({
        status: "Success",
        data: {
          message: "Article Deleted Successfully"
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = { postArticle, getArticleById, updateArticle, deleteArticle };
