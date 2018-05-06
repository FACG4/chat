const app = require("./app");
const insert = require("./model/queries/insert");
const select = require("./model/queries/select");

var http = require("http").Server(app);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  select.selectMsg((err,result)=>{
    for (var i = 0; i < result.rowCount; i++) {
      console.log(result.rows[i].content);
      io.emit("chat message", result.rows[i].content);
    }
  })

  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
    insert.insertMsg(5,msg, (err,result)=>{
      // console.log();
      console.log(result);
      console.log('done');
    })

  });
});

http.listen(app.get("port"), function() {
  console.log("listening on ", app.get("port"));
});
