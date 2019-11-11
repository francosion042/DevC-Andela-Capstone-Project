const express = require("express");
const router = express.Router();
const articleController = require(".././controllers/articles");
//@API routes for article
//@users can post Article
//@----------get specific article
//@----------update article
//@----------Delete article

//@api for posting new article
router.post("/articles/", articleController.postArticle);

//@api for getting a specific article
router.get("/articles/:id", articleController.getArticleById);

//@api for updating an article
router.patch("/articles/:id", articleController.updateArticle);

//@api for deleting an article
router.delete("/articles/:id", articleController.deleteArticle);

module.exports = router;
