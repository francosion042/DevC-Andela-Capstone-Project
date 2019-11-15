const express = require("express");
const router = express.Router();
const articleController = require(".././controllers/articles");
const auth = require(".././middleware/auth");
//@API routes for article
//@users can post Article
//@----------get specific article
//@----------update article
//@----------Delete article

//@api for posting new article
router.post("/articles/", auth, articleController.postArticle);

//@api for getting a specific article
router.get("/articles/:id", auth, articleController.getArticleById);

//@api for updating an article
router.patch("/articles/:id", auth, articleController.updateArticle);

//@api for deleting an article
router.delete("/articles/:id", auth, articleController.deleteArticle);

module.exports = router;
