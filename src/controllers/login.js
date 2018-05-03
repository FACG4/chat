const select = require('../model/queries/select');

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
        if(result.rowCount>0)
        res.redirect('/');
        else
        res.send('<h1>Wrong name or password</h1>')
      }
    })

  }else{
    res.send('<h1>Name and Password are required</h1>')
  }
};
