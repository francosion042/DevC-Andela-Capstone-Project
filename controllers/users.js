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
  pool
    .query(
      "INSERT INTO users (firstname,lastname,email,password,gender,jobrole,department,address,is_admin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        firstname,
        lastname,
        email,
        password,
        gender,
        jobrole,
        department,
        address,
        is_admin
      ]
    )
    .then(() => {
      pool
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then(results => {
          res.status(201).json({
            Status: "Success",
            data: {
              message: "User account Successfully created",
              token: "String",
              userId: results.rows[0].id
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
};
