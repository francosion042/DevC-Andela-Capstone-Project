const express = require("express");
const router = express.Router();
const feedController = require(".././controllers/feeds");
const auth = require(".././middleware/auth");

router.get("/feed", auth, feedController.getFeeds);

module.exports = router;
