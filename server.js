var express = require('express');
var app = express();
const fs = require('fs');
var port = process.env.PORT || 8000;

//### Challenge 2:
app.get("/", function(req, res) {
  res.send("hello");
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
