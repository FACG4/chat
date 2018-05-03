const select = require('../model/queries/select');
const bcrypt = require('bcryptjs');


exports.get = (req, res) => {
  res.render("login", {
    title: "Login Page"
  });
};


exports.post = (req, res) => {
  if(req.body){
    const {username, password} = req.body;
    if(username.trim() !== '' && password !== ''){
      select.selectHashedPassword(username.trim()), (err, hashedDB)=>{
        if(err) res.send('<h1>Wrong name or password</h1>');
        bcrypt.compare(password, hashedDB,(err, result)=> {
          if(err) res.status(500);
          if(result){
            //jwt
            //redirect
            res.redirect('/')
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
