const select = require('../model/queries/select');
const { sign, verify } = require('jsonwebtoken');

exports.get = (req, res) => {
  res.render("login", {
    title: "Login Page"
  });
};


exports.post = (req, res) => {
  if(req.body.name !== '' && req.body.password !== ''){
    select.selectUserData(req.body, (err,result)=>{
      if(err){
        console.log(err);
      }else{

        if(result.rowCount===1){
          var userDetails = result.rows[0];
          const SECRET = 'abc';
          const cookie = sign(JSON.stringify(userDetails), SECRET);
          res.cookie('user_session',cookie, { maxAge: 900000, httpOnly: true });
          res.redirect('/');
          res.end();
        }else {
          res.send('<h1>Wrong name or password</h1>')
          res.end();

        }

         }
    })
    let data = '';
 req.on('data', (chunk) => {
   data +=chunk;
   console.log(data);

 });

  }else{
    res.send('<h1>Name and Password are required</h1>')
  }
};
