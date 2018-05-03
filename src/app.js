const express = require("express");
const favicon = require("serve-favicon");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const controllers = require("./controllers/index");
const helpers = require("./views/helpers/index");
const path = require("path");
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("port", process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));
app.use(express.static("public"));
// app.use('/user/Israa',express.static(path.join(__dirname,"..", "public")));
app.use(controllers);

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    defaultLayout: "main",
    helpers
  })
);

module.exports = app;
