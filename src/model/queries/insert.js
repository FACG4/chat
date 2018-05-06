const db = require('./../db_connect');

const insertUser = (username, email, password, cb)=>{
  const sql ={
    text:'INSERT INTO users (username,email,password) VALUES ($1,$2,$3)',
    values:[username, email, password]
  };

  db.query(sql, (err,result)=>{
    if(err) return cb(err);
    return cb(null, result);
  })
};

const insertMsg = (user_id,content,cb)=>{
  // const sql ={
  //   text:'INSERT INTO messages (user_id, content, date) VALUES ($1,$2, $3)',
  //   values:[user_id, content, 'DEFAULT']
  // };

  db.query(`INSERT INTO messages (user_id, content, date) VALUES (${user_id},${content},DEFAULT)`, (err,result)=>{
    console.log('con',content);
    console.log('inside insert');
    if(err) return cb(err);
    return cb(null, result);
  })
};

module.exports = {
  insertUser,
  insertMsg
}
