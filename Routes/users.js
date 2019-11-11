const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.post("/auth/create-user", userController.createUser);

module.exports = router;
