import { router } from '../../app.js';

export function ClientSignupAjax() {
  const signInButton = document.getElementById('client-signup');
  signInButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      getLoginInput();
  });
}

function getLoginInput() {
  let phone       = document.getElementById("login-phone").value;
  var kyc_consent = document.getElementById("use_kyc").checked;

  if (isPhoneNumberValid(phone)) {
    KYC_CONSENT = kyc_consent;
    USER_PHONE  = phone;

    requestOTP(phone);
  }
}

function requestOTP(phone) {
  const raw = JSON.stringify({
    "phone_number": phone
  });

  showSpinner();

  var req = $.ajax({
    "url": SERVER_URL + "register",
    "method": "POST",
    "data": raw,
    "headers": {"Content-Type": "application/json"}
    });

  req.done(function(data){
      showInfoMsg("Alert", data.message);

      if (data.message == "OTP sent successfully") {
        USER_PHONE = phone;
        console.log(data.OTP);
        //change to opt page
        pagename = 'otp';
        router();
      } else if (data.message == "Error sending SMS") {
        console.log("Error sending sms OTP could not be sent please try again later.");
        //reomve this later
        pagename = 'otp';
        router();
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