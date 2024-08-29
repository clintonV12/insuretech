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

function newUserForm1Valid() {
  let fname    = document.getElementById("new-user-fn").value;
  let lname    = document.getElementById("new-user-ln").value;
  let dob      = document.getElementById("new-user-dob").value;
  let pin      = document.getElementById("new-user-nid").value;
  let gender   = document.getElementById("new-user-g").value;
  let maritalS = document.getElementById("new-user-ms").value;

  let error    = document.getElementById("errorMsg1");
  let invalid  = "Fields";

  if (fname == ""){invalid = invalid + ", First Name";}
  if (lname == ""){invalid = invalid + ", Last Name";}
  if (dob == "yyyy-mm-dd"){invalid = invalid + ", Date of Birth";}
  if (pin == ""){invalid = invalid + ", National ID";}
  if (gender == ""){invalid = invalid + ", Gender";}
  if (maritalS == ""){invalid = invalid + ", Marital Status";}

  if (invalid != "Fields") {
    error.innerText = "Please enter the following " + invalid;
    return false;
  } else {
    error.innerText = "";
    return true;
  }
}

function newUserForm2Valid() {
  let radio1 = document.getElementById("radio1").checked;
  let radio2 = document.getElementById("radio2").checked;
  let radio3 = document.getElementById("radio3").checked;
  let error  = document.getElementById("errorMsg2");

  if (radio1 == radio2 == radio3 == false) {
    error.innerText = "Please select one of the plans to continue";
    return false;
  } else {
    error.innerText = "";
    return true;
  }
}

function newUserForm3Valid() {
  let fname    = document.getElementById("b-fn").value;
  let lname    = document.getElementById("b-ln").value;
  let dob      = document.getElementById("b-dob").value;
  let pin      = document.getElementById("b-nid").value;
  let phone    = document.getElementById("b-phone").value;
  let relation = document.getElementById("b-rel").value;

  let error    = document.getElementById("errorMsg3");
  let invalid  = "Fields";

  if (fname == ""){invalid = invalid + ", First Name";}
  if (lname == ""){invalid = invalid + ", Last Name";}
  if (dob == "yyyy-mm-dd"){invalid = invalid + ", Date of Birth";}
  if (pin == ""){invalid = invalid + ", National ID";}
  if (phone.length != 8){invalid = invalid + ", Phone number";}
  if (relation == ""){invalid = invalid + ", Relationship";}

  if (invalid != "Fields") {
    error.innerText = "Please enter the following " + invalid;
    return false;
  } else {
    error.innerText = "";
    return true;
  }
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