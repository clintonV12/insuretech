import { router } from '../../app.js';

export function ClientLoginAjax() {
  const signInButton = document.getElementById('client-login');
  signInButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      getLoginInput();
  });

  initGlobalVars();
}

function getLoginInput() {
  let phone = document.getElementById("login-phone").value;

  if (isPhoneNumberValid(phone)) {
    requestOTP(phone);
  }
}

function requestOTP(phone) {
  const raw = JSON.stringify({
    "phone_number": phone
  });

  showSpinner();

  var req = $.ajax({
    "url": SERVER_URL + "login",
    "method": "POST",
    "data": raw,
    "headers": {"Content-Type": "application/json"}
    });

  req.done(function(data){
      
      if (data.message == "OTP sent successfully") {
        showInfoMsg("Alert", `Your OTP is: ${data.OTP}`);
        USER_PHONE = phone;
        //change to opt page
        pagename = 'login-otp';
        router();
      } else {
        showErrorMsg("Error", data.message);
      } 
    });

  req.fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      showErrorMsg("Error", textStatus.toString());
    });

  req.always(function(){
    hideSpinner();
  });
}