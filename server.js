const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

//middleware goes here
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get("", function(req, res) {
  res.sendfile("index.html", {root: './public'});
});

app.post("/newusr/", function(req, res) {
  let usrInput = req.body;
  let readArr = fs.readFileSync("./storage.json", "utf8");
  let newArr = JSON.parse(readArr);

  newArr.push(usrInput);

  fs.writeFileSync('./storage.json', JSON.stringify(newArr));

  res.send('The user was appended to file!');
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
