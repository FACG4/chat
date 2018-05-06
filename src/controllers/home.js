const select = require("../model/queries/select");
const insert = require("../model/queries/insert");

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
}
// exports.post =(req,res)=>{
//     console.log(req.body);
//     const {msg}= req.body;
//     insert.insertMsg(1,msg, (err,result)=>{
//      if(err) res.status(500);
//      // res.status(200);
//      return
//         })
// }
