const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require(".././middleware/auth");
const admin_auth = require(".././middleware/admin_auth");
const userController = require("../controllers/users");
//@User Routes
//@Admin can Create User
//@----------Delete User
//@user can signin
//@---------do other things

//@Route for the Admin to create User
/*
  @Description: endpoint for admin to add user
  @Access: private only admin users
  @Route: <domain>/api/v1/auth/create-user
*/
router.post(
  "/auth/create-user",
  [
    admin_auth,
    check("email", "Enter a Valid email")
      .isEmail()
      .isLowercase()
      .not()
      .isEmpty(),
    check("password", "Password must be more than 5").isLength({ min: 6 }),
    check("is_admin", "Your input should be either True or False").isBoolean()
  ],
  userController.createUser
);

//@Route for the user to sign in
router.post(
  "/auth/signin",
  [
    check("email", "Please enter a valid email")
      .isEmail()
      .isLowercase()
      .not()
      .isEmpty()
  ],
  userController.signin
);

//@Route to get a single User
router.get("/auth/users/:id", auth, userController.getUser);

//@Router to delete a user
router.delete("/auth/users/:id", auth, userController.deleteUser);

module.exports = router;
