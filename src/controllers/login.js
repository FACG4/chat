const select = require("../model/queries/select");
const bcrypt = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");
const cookie = require("cookie");

exports.get = (req, res) => {
  if (!req.headers.cookie || !req.headers.cookie.includes("token")) {
    res.render("login", {
      title: "Login"
    });
  } else {
    const token = cookie.parse(req.headers.cookie).token;
    verify(token, process.env.JWT_KEY, function(err, decoded) {

      if (err) res.status(500);
      else {
        res.redirect("/");
        console.log(decoded);
      }
    });
  }
};

exports.post = (req, res) => {
  if (req.body) {
    const { username, password } = req.body;
    if (username.trim() !== "" && password !== "") {
      select.selectHashedPassword(username.trim(), (err, hashedDB) => {
        if (err) res.send("<h1>Wrong name or password</h1>");
        bcrypt.compare(password, hashedDB, (err, hashedResult) => {
          if (err) res.status(500);
          if (hashedResult) {
            select.selectUserData(username, null, hashedDB, (err, result) => {
              if (err) return res.status(500); //data base err
              if (result.rowCount === 1) {
                const userDetails = result.rows[0];
                const SECRET = process.env.JWT_KEY;
                const token = sign(JSON.stringify(userDetails), SECRET);
                res.cookie("token", token, {
                  maxAge: 900000,
                  httpOnly: false
                });
                res.redirect("/");
              }
            });
          } else {
            res.send("<h1>Wrong name or password</h1>");
          }
        });
      });
    } else {
      res.send("<h1>Name and Password are required</h1>");
    }
  } else {
    res.status(400).send("<h1>Invalid Data</h1>");
  }
};
