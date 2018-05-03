const select = require('../model/queries/select');




exports.get = (req, res) => {
  select.selectUserData({username:'Israa', password:123}, (err,result)=>{
    if(err) console.log(err);
    res.render("home", {
      title: "Chat",
      data: result.rows[0]
    });
  })
};
