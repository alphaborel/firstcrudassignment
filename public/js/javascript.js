function submitNewUsr() {
  //get the values of the form
  let user = document.getElementById('username');
  let email = document.getElementById('email');
  let state = document.getElementById('state');

  //create user object
  let usrObj = {
    'name': user.value,
    'email': email.value,
    'state': state.value
  }

  // send over user object
  fetch("/user/add", {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(usrObj)
    })
    .then(function(res) {
      alert("User Created!");
      console.log(res)
    })
    .catch(function(res) {
      alert("Something Went Wrong!");
      console.log(res)
    })

  //clear text boxes
  user.value = "";
  email.value = "";
  state.value = "";

}; //end submitNewUsr()

//request a single user
function userSearch() {
  let bigTextBox = document.getElementById('textfield');
  let usernameSearch = document.getElementById('nameSearch');
  fetch(`/user/${usernameSearch.value}`)
    .then(function(res) {
      let singleUsr = res.text();
      singleUsr.then(function(value) {

        if (value !== "User not found") {
          //turning the text returned into an object
          let output = JSON.parse(value);
          //populating the text boxes with the rest of the object
          document.getElementById('emailSearch').value = output.email;
          document.getElementById('stateSearch').value = output.state;
          return;
        } //end if statement

        alert("User not found");
      }) //end second then function
    })
    .catch(function(res) {
      alert("Something Went Wrong!");
      console.log(res)
    })
}; // end userSearch()

//grabbing elements for the update user click event
var userUpdateBtn = document.getElementById('updateBtn');

userUpdateBtn.addEventListener('click', function() {
  //tried queryselectorall here but it wouldn't work with .value ?
  switch (true) {
    case document.getElementById('nameSearch').value === "":
      alert("Please Seach for a user before updating.")
      break;
    case document.getElementById('emailSearch').value === "":
      alert("Please Seach for a user before updating.")
      break;
    case document.getElementById('stateSearch').value === "":
      alert("Please Seach for a user before updating.")
      break;
  }; //end switch statement

  //create updated user object
  let updatedUsrObj = {
    'name': nameSearch.value,
    'email': emailSearch.value,
    'state': stateSearch.value
  }

  //check to make sure the user object doesn't have any blanks
  if (updatedUsrObj.name === "" || updatedUsrObj.email === "" || updatedUsrObj.state === "") {
    return;
  }

  fetch("./user/update/", {
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(updatedUsrObj)
    })
    .then(function(res) {
      alert("User Updated!");
    })
    .catch(function(res) {
      alert("Something Went Wrong!");
      console.log(res)
    })

  //clear text boxes
  nameSearch.value = "";
  emailSearch.value = "";
  stateSearch.value = "";

}) //end update user eventlistener

function deleteUser() {
  let usrnameToDel = document.getElementById('usrNameBox').value;
  fetch(`/user/del/${usrnameToDel}`, {
      headers: {
        'content-type': 'text/plain'
      },
      method: 'DELETE',
    })
    .then(function(res) {
      let serverRes = res.text();
      serverRes.then(function(value) {
        //check and see if the delete was sucessful
        if (value === "User not found") {
          alert("User not found!");
          return;
        } //end if statement
        alert("User deleted")
      })
    })
    .catch(function(res) {
      alert("Something Went Wrong!");
      console.log(res)
    })

}; //end deleteUser()

//grabbing elements for the search all click event
var returnAll = document.getElementById('searchAllBtn');
//the search all users event listener
returnAll.addEventListener('click', function() {
  let allUsrTextBox = document.getElementById('textfield');
  fetch("/user/all")
    .then(function(res) {
      res.text().then(function(text) {
        allUsrTextBox.textContent = text;
      })
    })
    .catch(function(res) {
      alert("Something Went Wrong!");
      console.log(res)
    })
}); //end returnAll event listener and seach all btn
