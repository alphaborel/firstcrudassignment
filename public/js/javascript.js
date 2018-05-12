
document.addEventListener("DOMContentLoaded", function() {

}); //end page load function

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
fetch("/newusr/",
{
  headers: {
    'content-type' : 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(usrObj)
})
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) })
}
