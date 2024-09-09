import { router } from '../../app.js';

export function AgentLoginAjax() {
  const signInButton = document.getElementById('agent-login');
  signInButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      getLoginInput();
  });
}

function getLoginInput(){
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

  if (username.length == 0 || password.length == 0){
    showErrorMsg("Error", "Input can't be empty");

  } else {
    showSpinner();
    requestLogin(username, password);
  }
	
}

function requestLogin(username, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let raw = "";

  if (emailRegex.test(username)) {
    raw = JSON.stringify({
      "type": "LOGIN",
      "email": username,
      "password": password
    });
  } else {
    raw = JSON.stringify({
      "type": "LOGIN",
      "username": username,
      "password": password
    });
  }

  var req = $.ajax({
    "url": SERVER_URL + "agent",
    "method": "POST",
    "data": raw,
    "headers": {"Content-Type": "application/json"}
    });

  req.done(function(data){
      //if the call is successful
      if (data.token) {
        USER_TYPE      = "AGENT";
        TOKEN          = data.token;
        AGENT_USERNAME = data.username;
        AGENT_ID       = data.id;
        
        pagename = 'agent-dashboard';
        router();

      } else {
        showErrorMsg("Error", "Login failed: " + data.message);
      }
    });

  req.fail(function(jqXHR, textStatus, errorThrown){
      //if the call is not successful
      console.log(jqXHR);
      showErrorMsg("Error", jqXHR.responseText);
    });

  req.always(function(){
    hideSpinner();
  });
}