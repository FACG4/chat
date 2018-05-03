const bcrypt = require("bcryptjs");
const insert = require("../model/queries/insert");
const checkUserExistance = require("./checkuser");
const { sign, verify } = require("jsonwebtoken");
const cookie = require("cookie");

exports.post = (req, res) => {
  if (req.body) {
    const { username, email, password } = req.body;
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      checkUserExistance(username.trim(), email.trim(), null, status => {
        if (!status) {
          //user doesn't exist
          bcrypt.hash(password, 8, (err, hashedPassword) => {
            if (err) {
              res.status(500);
            } else {
              insert.insertUser(
                username.trim(),
                email.trim(),
                hashedPassword,
                (err, result) => {
                  if (err) throw new Error("sign up Failed");
                  res.redirect("/login");
                }
              );
            }
          });
        } else {
          //user exist
          res.send("<h1>User Already Exist</h1>");
        }
      });
    } else {
      res.send("<h1>All Fields Are Required</h1>");
    }
  } else {
    res.status(400).send("<h1>Invalid Data</h1>");
  }
};

exports.get = (req, res) => {
  const token = cookie.parse(req.headers.cookie).token;
  if (token) {
    verify(token, process.env.JWT_KEY, function(err, decoded) {
      if (err) res.status(500);
      else {
        res.redirect("/login");
      }
    });
  } else {
    res.render("signup", {
      title: "signup"
    });
  }
};
