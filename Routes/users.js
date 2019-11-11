const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
//@User Routes
//@Admin can Create User
//@----------Delete User
//@user can signin
//@---------do other things

//@Route for the Admin to create User
router.post("/auth/create-user", userController.createUser);

//@Route for the user to sign in
router.post("/auth/signin", userController.signin);

module.exports = router;
