const express = require("express");
const router = express.Router();
const gifController = require(".././controllers/gifs");

//@api for posting new gif
router.post("/", gifController.postGif);

//@api for getting a specific gif
router.get("/:id", gifController.getGifById);

//@api for updating an gif
router.patch("/:id", gifController.updateGif);

//@api for deleting an gif
router.delete("/:id", gifController.deleteGif);

module.exports = router;
