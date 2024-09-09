import { router } from '../../app.js';

export function ClientSignupOTPAjax() {
  const verifyButton = document.getElementById('verify-signup');
  verifyButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      getOTPInput();
  });
}

function getOTPInput(){
  let otp = document.getElementById("signup-otp").value;

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
    "url": SERVER_URL + "register",
    "method": "POST",
    "data": raw,
    "headers": {"Content-Type": "application/json"}
    });

  req.done(function(data){
      //if the call is successful
      /*if (KYC_CONSENT) {
        //get kyc info and auto-fill form
      } else if(!KYC_CONSENT) {
        //manual entry of form
      }*/
      if (data.token) {
        USER_TYPE = "CLIENT";
        TOKEN     = data.token;
        pagename  = 'new-user';
        router();
      } else {
        showInfoMsg("Alert", data.error);
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
