const select = require("../model/queries/select");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

exports.get = (req, res) => {
  if (!req.headers.cookie || !req.headers.cookie.includes("token")) {
    res.redirect("/login");
  } else {
    const token = cookie.parse(req.headers.cookie).token;
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        if (err) res.status(500);
        else {
          res.render("home", {
            title: "Chat",
            decoded:decoded
          });
        }
      });
    }
  }
};
