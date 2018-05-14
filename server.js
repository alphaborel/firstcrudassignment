const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const port = process.env.PORT || 8020;

//middleware goes here
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//this is the starting point and serves the "home page"
app.get("", function(req, res) {
  res.sendfile("index.html", {
    root: './public'
  });
});

//this is the interface to add a new user
app.post("/user/add", function(req, res) {
  let usrInput = req.body;
  let readArr = fs.readFileSync("./storage.json", "utf8");
  let newArr = JSON.parse(readArr);

  newArr.push(usrInput);

  fs.writeFileSync('./storage.json', JSON.stringify(newArr));

  res.send('The user was appended to file!');
});

//this is the rout to update an existing user
app.put("/user/update", function(req, res) {
  let updatedUsr = req.body;

  //read the "database" and make it into an array
  let usrList = fs.readFileSync("./storage.json", "utf8");
  let usrListArr = JSON.parse(usrList);

  //filter out the existing user object
  let minusUsr = usrListArr.filter(update => update.name !== updatedUsr.name);

  minusUsr.push(updatedUsr);

  fs.writeFileSync('./storage.json', JSON.stringify(minusUsr));

  res.sendStatus(200);
});

//this is the route for returning all users
app.get("/user/all", function(req, res) {
  let userList = fs.readFileSync("./storage.json", "utf8");
  res.send(userList);
});

//tells whether a user is in the list or not
app.get("/user/:name", function(req, res) {
  var userToFind = req.params.name;
  let userList = fs.readFileSync("./storage.json", "utf8");
  var userArr = JSON.parse(userList);

  //filter refused to work saying.name was undefined ??
  //let userFound = userArr.filter(i => userArr[i].name === userToFind);

  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].name === userToFind) {
      return res.send(userArr[i]);
    } // end if statement
  } //end for loop
  res.send("User not found");
});

app.delete("/user/del/:user", function(req, res) {
  let usrToDel = req.params.user;

  //read the "database" and make it into an array
  let usrListDel = fs.readFileSync("./storage.json", "utf8");
  let usrListArrDel = JSON.parse(usrListDel);

  //filter out the existing user object
  let deletedUsr = usrListArrDel.filter(find => find.name !== usrToDel);

  if(usrListArrDel.length === deletedUsr.length){
    res.send("User not found");
  } else {
    fs.writeFileSync('./storage.json', JSON.stringify(deletedUsr));
    res.sendStatus(200);
  }

});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
