import { router } from '../../app.js';

export function ResetPassword() {
  const resetButton = document.getElementById('reset-password');
  resetButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      requestPasswordReset();
  });

  initGlobalVars();
}

function requestPasswordReset() {
  let email = document.getElementById("agent-email").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let raw = "";

  if (emailRegex.test(email)) {
    raw = JSON.stringify({
      "type": "RECOVERY",
      "email": email
    });
  } else {
    raw = JSON.stringify({
      "type": "RECOVERY",
      "username": email
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
      console.log(data);
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