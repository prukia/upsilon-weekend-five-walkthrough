var express = require("express");
var bodyParser = require('body-parser');
var index = require("./routes/index");
var favorites = require("./routes/favorites");


var app = express();
//sends json instead of url encoded. you won't see anything show up in ur
//request body
app.use(bodyParser.json());
app.use(express.static("public"));
app.use('/favorites', favorites);

//sending index pg anytime they go to any route.
app.use("/*", index);

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log("Server listening on port", server.address().port);
});
