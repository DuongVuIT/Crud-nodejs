var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var controller = require(__dirname + "/apps/controller");
app.use(controller);
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));

const Port = 3000;
var server = app.listen(Port, function () {
  console.log("server listening" + " " + Port);
});
