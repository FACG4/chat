const select = require('../model/queries/select');
const bcrypt = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');

exports.get = (req, res) => {
  res.render("login", {
    title: "Login Page"
  });
};


exports.post = (req, res) => {
  if(req.body){
    const {username, password} = req.body;
    if(username.trim() !== '' && password !== ''){
      select.selectHashedPassword(username.trim(), (err, hashedDB)=>{
        if(err) res.send('<h1>Wrong name or password</h1>');
        bcrypt.compare(password, hashedDB,(err, hashedResult)=> {
          if(err) res.status(500);
          console.log(hashedResult);
          if(hashedResult){
            console.log('in');
            select.selectUserData(username,null, hashedDB, (err,result)=>{
              console.log('in select');
              console.log(result.rowCount);
              if(err) return res.status(500);//data base err
              if(result.rowCount===1){
                var userDetails = result.rows[0];
                const SECRET = 'abc';
                const cookie = sign(JSON.stringify(userDetails), SECRET);
                res.cookie('user_session',cookie, { maxAge: 900000, httpOnly: true });
                res.redirect('/');
              }
            })
          }else{
            res.send('<h1>Wrong name or password</h1>');
          }
        });
      })
    }else{
      res.send('<h1>Name and Password are required</h1>')
    }
  }else{
    res.status(400).send('<h1>Invalid Data</h1>')
  }
};
