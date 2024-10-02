import { router } from '../../app.js';

export function VerifyClientPhoneAjax() {
  const verifyButton = document.getElementById('verify_client_phone');
  verifyButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      console.log("clicked");
      getPhoneNumberInput();
  });

  const verifyOTP = document.getElementById('verify_client_otp');
  verifyOTP.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      getOTPInput();
  });

}

var clientPhone = 0;

function getPhoneNumberInput() {
  let phone = document.getElementById("phone_num").value;

  if (phone.length != 8) {
    document.getElementById("error1").innerText = "Please enter a valid phone number.";
    return;
  } else {
    requestPhoneVerification(phone);
  }
}

function getOTPInput() {
  let otp = document.getElementById("phone_otp").value;

  if (otp.length != 6) {
    document.getElementById("error2").innerText = "Please enter a valid OTP.";
    return;
  } else {
    requestOTPVerification(otp, clientPhone);
  }
}

function requestPhoneVerification(phone) {
  const raw = JSON.stringify({
    "verify_client_phone":1,
    "client_phone":phone
  });
  showSpinner();

  var req = $.ajax({
    "url": SERVER_URL + "agent",
    "method": "POST",
    "data": raw,
    "headers": {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
      }
    });

  req.done(function(data){
    console.log(data);
    
    if (data.message == "OTP sent successfully") {
      showInfoMsg("Alert", `Your OTP is: ${data.OTP}`);
      clientPhone = phone;
      //change the displayed modal
      $("#client_phone").modal("hide");
      const modal = new bootstrap.Modal('#client_otp');
      modal.show();
    } else {
      showInfoMsg("Alert", data.message);
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

function requestOTPVerification(otp, phone) {
  const raw = JSON.stringify({
    "verify_client_otp":1,
    "client_phone":phone,
    "client_otp_code":otp
  });
  showSpinner();

  var req = $.ajax({
    "url": SERVER_URL + "agent",
    "method": "POST",
    "data": raw,
    "headers": {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
      }
    });

  req.done(function(data){
    console.log(data);
    if (data.message == "OTP verified") {
      USER_PHONE = phone;
      $("#client_otp").modal("hide");
      pagename = 'agent-onboarding';
      router();
    }
    else{
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