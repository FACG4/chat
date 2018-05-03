const db = require('./../db_connect');

const selectUserData = (username, email, password ,cb)=>{
  const sql;
  if(username !=='' && password !== null){
    sql ={
      text:'SELECT id, username FROM users WHERE username = $1 AND password = $2',
      values:[username, password]
    };
  }else{
    sql ={
      text:'SELECT username FROM users WHERE username = $1 OR email = $2',
      values:[username, email]
    };
  }

  db.query(sql, (err,result)=>{
    if(err) return cb(err);
    return cb(null, result);
  })
};

const selectHashedPassword = (username, cb)=>{
  const sql ={
    text:'SELECT password FROM users WHERE username = $1',
    values:[username]
  };

  db.query(sql, (err,result)=>{
    if(err) return cb(err);
    return cb(null, result.rows[0].password);
  })

}


const selectMsg = (cb)=>{
  const sql ={
    text:'SELECT user_id, content, date FROM messages'
  };

  db.query(sql, (err,result)=>{
    if(err) return cb(err);
    return cb(null, result);
  })
};

module.exports = {
  selectUserData,
  selectHashedPassword,
  selectMsg
}
