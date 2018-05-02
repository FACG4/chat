const app = require("./app");

app.listen(app.get("port"), () => {
  console.log("listen to port ", app.get("port"));
});
