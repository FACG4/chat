const select = require('../model/queries/select');
const jwt = require('jsonwebtoken');


exports.get = (req, res) => {
  console.log(decoded);
  if(req.headers.cookie)
  {
    
  }
  jwt.verify('user_session','abc',(err ,decoded)=>{
    console.log(decoded);
    if(err){
       throw new Error(err);
    }else{
      res.render("login", {
        title: "Login Page"
      });
    }
  })

};

