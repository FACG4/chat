const db = require('./../db_connect');

const selectUserData = (data,cb)=>{
  const {username,password} = data;
  let sql ={
    text:'SELECT id, username FROM users WHERE username = $1 AND password = $2',
    values:[username,password]
  };

  db.query(sql, (err,result)=>{
    if(err) return cb(err);
    return cb(null, result);
  })
};


const selectMsg = (cb)=>{
  let sql ={
    text:'SELECT user_id, content, date FROM messages'
  };

  db.query(sql, (err,result)=>{
    if(err) return cb(err);
    return cb(null, result);
  })
};

module.exports = {
  selectUserData,
  selectMsg
}
