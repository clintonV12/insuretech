function isPhoneNumberValid(phone) {
  isValid = false;

  if (phone.length == 8) {
    isValid = true;
  } else {
    var errorMsg = 'Please enter a valid phone number.';
    showErrorMsg("Error", errorMsg);
    isValid = false;
  }

  return isValid;
}

function isOTPValid(otp) {
  isValid = false;

  if (otp.length == 6) {
    isValid = true;
  } else {
    var errorMsg = 'Your OTP is invalid.';
    showErrorMsg("Error", errorMsg);
    isValid = false;
  }

  return isValid;
}

function isNationalIDValid(pin) {
  isValid = false;

  if (pin.length == 13) {
    isValid = true;
  } else {
    isValid = false;
  }

  return isValid;
}

function newUserForm4Valid() {
  let p_method = document.getElementById("payment-method").value;
  let p_date   = document.getElementById("payment-date").value;

  let error    = document.getElementById("errorMsg4");
  let invalid  = "Fields";

  if (p_method == ""){invalid = invalid + ", Payment Method";}
  if (p_date == ""){invalid = invalid + ", Payment Date";}

  if (invalid != "Fields") {
    error.innerText = "Please enter the following " + invalid;
    return false;
  } else {
    error.innerText = "";
    return true;
  }
}

function newUserTsAndCsAgreed() {
  let terms = document.getElementById("agree").checked;

  if (terms == false) {
    let title = "One last thing"
    let error = "You must agree to the terms and conditions to complete registration.";
    showErrorMsg(title, error);
    return false;
  } else {
    showSuccessMsg("Registration in Progress", "Good job, the registration process has been started.");
    return true;
  }
}