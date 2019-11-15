const express = require("express");
const router = express.Router();
const gifController = require(".././controllers/gifs");
const auth = require(".././middleware/auth");

//@API routes for Gifs
//@users can post Gif
//@----------get specific gif
//@----------update gif
//@----------Delete gif

//@api for posting new gif
router.post("/gifs", auth, gifController.postGif);

//@api for getting a specific gif
router.get("/gifs/:id", auth, gifController.getGifById);

//@api for updating an gif
router.patch("/gifs/:id", auth, gifController.updateGif);

//@api for deleting an gif
router.delete("/gifs/:id", auth, gifController.deleteGif);

module.exports = router;
