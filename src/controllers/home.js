const select = require('../model/queries/select');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

exports.get = (req, res) => {
  if (req.headers.cookie) {
    jwt.verify(req.headers.cookie.split("=").slice(1).toString(), process.env.JWT_KEY, function(err, decoded) {
        if (err) console.log(err);
        else {
          res.render('home', {
            title: 'Chat'
          })
        }
      })
    }
    else{
      res.redirect('/login')
    }
  }
