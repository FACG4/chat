const db = require('./../db_connect');

const insertUser = (data,cb)=>{
  const {username,email,password} = data;
  let sql ={
    text:'INSERT INTO users (username,email,password) VALUES ($1,$2,$3)',
    values:[username, email, password]
  };

  db.query(sql, (err,result)=>{
    if(err) return cb(err);
    return cb(null, result);
  })
};

const insertMsg = (data,cb)=>{
  const {user_id,content} = data;
  let sql ={
    text:'INSERT INTO messages (user_id, content, date) VALUES ($1,$2, $3)',
    values:[user_id, content, 'DEFAULT']
  };

  db.query(sql, (err,result)=>{
    if(err) return cb(err);
    return cb(null, result);
  })
};

module.exports = {
  insertUser,
  insertMsg
}
