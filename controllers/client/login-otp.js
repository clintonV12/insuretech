import { router } from '../../app.js';

export function ClientLoginOTPAjax() {
  const verifyButton = document.getElementById('verify');
  verifyButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      getOTPInput();
  });
}

function getOTPInput(){
  let otp = document.getElementById("user-otp").value;

  if (isOTPValid(otp)) {
    verifyOTP(USER_PHONE, otp);
  }
}

function verifyOTP(phone, code) {
  const raw = JSON.stringify({
    "phone_number": phone,
    "otp_code": code
  });
  showSpinner();

  var req = $.ajax({
    "url": SERVER_URL + "login",
    "method": "POST",
    "data": raw,
    "headers": {"Content-Type": "application/json"}
    });

  req.done(function(data){
      //if the call is successful
      if (data.token) {
        TOKEN = data.token;
        pagename = 'dashboard';
        router();
      } else {
        showErrorMsg("Error", data.error);
      }
    });

  req.fail(function(jqXHR, textStatus, errorThrown){
      //if the call is not successful
      console.log(jqXHR);
      showErrorMsg("Error", textStatus.toString());
    });

  req.always(function(){
    hideSpinner();
  });
}
