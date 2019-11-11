const express = require("express");
const router = express.Router();
const articleCommentCtrl = require(".././controllers/articleComments");
const gifCommentCtrl = require(".././controllers/gifComments");

//@API route for article comment
//@user can create comment
//@---------update comment

router.post("/articles/:id/comments", articleCommentCtrl.postComment);
//@---------delete comment
router.delete("/articles/:id1/comments/:id2", articleCommentCtrl.deleteComment);

//@API route for gif comment
//@user can create comment
//@---------update comment

router.post("/gifs/:id/comments", gifCommentCtrl.postComment);
//@---------delete comment
router.delete("/gifs/:id1/comments/:id2", gifCommentCtrl.deleteComment);

module.exports = router;
