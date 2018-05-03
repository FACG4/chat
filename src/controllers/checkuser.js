const select = require("../model/queries/select");

const checkUserExistance = (username, email, password, cb) => {
  select.selectUserData(username, email, password, (err, result) => {
    if (err) return cb(err);
    else {
      cb(result.rowCount > 0);
    }
  });
};

module.exports = checkUserExistance;
