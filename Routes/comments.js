const express = require("express");
const router = express.Router();
const articleCommentCtrl = require(".././controllers/articleComments");

router.post("/articles/:id/comments", articleCommentCtrl.postComment);

module.exports = router;
