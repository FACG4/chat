const dbcon = require("./db_connect.js");
const fs = require("fs");
const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();
const dbConnect = cb => {
  dbcon.query(sql, (err, res) => {
    if (err) return cb(err);
    cb(null, res);
  });
};
dbConnect((err, result) => {
  console.log("chat database has been initialized");
});
module.exports = dbConnect;
