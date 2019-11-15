const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "mysecretkey";
const pool = require("../DBConfig/dbconfig");

exports.createUser = (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    gender,
    jobrole,
    department,
    address,
    is_admin
  } = req.body;

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }


  //@check if user exists
  pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then(user => {
      if (user.rows[0]) {
        return res.status(406).json({
          errors: "User already exists"
        });
      }

      //@get user gravatar
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "404" });

      //@encrypt password
      bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(password, salt).then(hashedpassword => {
          //@SQl query to create a new user
          pool
            .query(
              "INSERT INTO users (firstname,lastname,email,password,gender,jobrole,department,address,is_admin,avatar) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
              [
                firstname,
                lastname,
                email,
                hashedpassword,
                gender,
                jobrole,
                department,
                address,
                is_admin,
                avatar
              ]
            )
            .then(() => {
              pool
                .query("SELECT * FROM users WHERE email = $1", [email])
                .then(results => {
                  //@Return jsonwebtoken
                  const payload = {
                    user: {
                      id: results.rows[0].id,
                      is_admin: results.rows[0].is_admin
                    }
                  };
                  jwt.sign(
                    payload,
                    jwtSecret,
                    { expiresIn: 3600 },
                    (err, token) => {
                      if (err) {
                        return res.Status(401).json({
                          error: err
                        });
                      }
                      res.status(201).json({
                        Status: "Success",
                        data: {
                          message: "User account Successfully created",
                          token: token,
                          userId: results.rows[0].id,
                          avatar: avatar
                        }
                      });
                    }
                  );
                })
                .catch(error => {
                  console.log(error);
                  res.status(400).json({
                    status: "error",
                    error: error
                  });
                });
            })
            .catch(error => {
              console.log(error);
              res.status(400).json({
                status: "error",
                error: error
              });
            });
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
};

//@Function to signin User
exports.signin = (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { email, password } = req.body;

  //Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  //@sql query for a user to sign in
  pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then(results => {
      const valid = bcrypt.compare(password, results.rows[0].password);

      if (valid) {
        //@Return jsonwebtoken
        const payload = {
          user: {
            id: results.rows[0].id,
            is_admin: results.rows[0].is_admin
          }
        };
        jwt.sign(payload, jwtSecret, (err, token) => {
          if (err) {
            throw err;
          }
          res.status(201).json({
            Status: "Success",
            data: {
              message: "User account Successfully signed in",
              token: token,
              userId: results.rows[0].id,
              avatar: results.rows[0].avatar
            }
          });
        });
      } else {
        res.status(401).json({
          Status: "Unauthorized",
          data: {
            message: "Unauthorized access"
          }
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        status: "error",
        error: error
      });
    });
};

//@Function to get a user
exports.getUser = (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM users WHERE id = $1", [id])
    .then(results => {
      res.status(200).json({
        Status: "Success",
        data: {
          message: "User Account retrieved successfully",
          userId: id,
          firstname: results.rows[0].firstname,
          lastname: results.rows[0].lastname,
          email: results.rows[0].email,

          gender: results.rows[0].gender,
          jobrole: results.rows[0].jobrole,
          department: results.rows[0].department,
          address: results.rows[0].address,
          is_admin: results.rows[0].is_admin,
          avatar: results.rows[0].avatar
        }
      });
    })
    .catch(error => {
      res.status(400).json({
        status: "error",
        error: error
      });
    });
};

//@Function to delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  pool
    .query("DELETE FROM users WHERE id = $1", [id])
    .then(() => {
      res.status(200).json({
        Status: "Success",
        data: {
          message: "User deleted successfully",
          userId: id
        }
      });
    })
    .catch(error => {
      res.status(400).json({
        status: "error",
        error: error
      });
    });
};
