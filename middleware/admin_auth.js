const jwt = require("jsonwebtoken");
const jwtSecret = "mysecretkey";

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  //@check if it's Admin that wants to create user

  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.user.is_admin !== true) {
      return res.status(401).json({
        message: "Not Authorized to create user"
      });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
