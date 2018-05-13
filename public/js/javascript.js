
function submitNewUsr() {
//get the values of the form
let user = document.getElementById('username');
let email = document.getElementById('email');
let state = document.getElementById('state');

//create user object
let usrObj = {
  'name' : user.value,
  'email' : email.value,
  'state' : state.value
}

// send over user object
fetch("/user/add/",
{
  headers: {
    'content-type' : 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(usrObj)
})
.then(function(res){ alert("User Created!"); console.log(res) })
.catch(function(res){ alert("Something Went Wrong!"); console.log(res) })
}; //end submitNewUsr()

//request a single user
function userSearch(){
  let bigTextBox = document.getElementById('textfield');
  let usernameSearch = document.getElementById('nameSearch');
  fetch(`/user/${usernameSearch.value}`
)
  .then(function(res){ res.text().then(function(text) {
    bigTextBox.textContent = text; })
  })
  .catch(function(res){ alert("Something Went Wrong!"); console.log(res) })
} // end userSearch()

//grabbing elements for the search all click event
var returnAll = document.getElementById('searchAllBtn');
//the search all users event listener
returnAll.addEventListener('click', function() {
  let allUsrTextBox = document.getElementById('textfield');
  fetch("/user/all")
  .then(function(res){ res.text().then(function(text) {
    allUsrTextBox.textContent = text; })
  })
  .catch(function(res){ alert("Something Went Wrong!"); console.log(res) })
});//end returnAll event listener and seach all btn
