import { router } from '../../app.js';

export function NewUserAjax() {
  console.log("new user")
  const verifyButton = document.getElementById('complete_signup');
  verifyButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      requestSignup();
  });
}

function getValueOfCheckedPlan() {
  let radio1 = document.getElementById("radio1");
  let radio2 = document.getElementById("radio2");
  let radio3 = document.getElementById("radio3");

  if (radio1.checked) {return radio1.value;}
  if (radio2.checked) {return radio2.value;}
  if (radio3.checked) {return radio3.value;}
}

export function requestSignup() {
  let termsAgreed = newUserTsAndCsAgreed();

  if (!termsAgreed){
    return;
  } else if(termsAgreed){
    const raw = JSON.stringify({
      //general info
      "registration_type": "unassisted",
      //Customer details
      "phone_number": USER_PHONE,
      "client_fname": document.getElementById("new-user-fn").value,
      "client_lname": document.getElementById("new-user-ln").value,
      "client_dob": document.getElementById("new-user-dob").value,
      "client_pin": document.getElementById("new-user-nid").value,
      "client_gender": document.getElementById("new-user-g").value,
      "client_maritalS": document.getElementById("new-user-ms").value,
      //Plan details
      "policy_plan": getValueOfCheckedPlan(),
      //Beneficiary details
      "beneficiary_fname": document.getElementById("b-fn").value,
      "beneficiary_lname": document.getElementById("b-ln").value,
      "beneficiary_dob": document.getElementById("b-dob").value,
      "beneficiary_pin": document.getElementById("b-nid").value,
      "beneficiary_phone": document.getElementById("b-phone").value,
      "beneficiary_relationship": document.getElementById("b-rel").value,
      //Payment details
      "payment_method": document.getElementById("payment-method").value,
      "payment_date": document.getElementById("payment-date").value
    });

    var req = $.ajax({
      "url": SERVER_URL + "register",
      "method": "POST",
      "data": raw,
      "headers": {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
        }
      });

    req.done(function(data){
        //if the call is successful
        showInfoMsg("Alert", data.message);
        if (data.message == "Success" || data.message == "success") {
          pagename = 'dashboard';
          router();
        }
      });

    req.fail(function(jqXHR, textStatus, errorThrown){
        //if the call is not successful
        console.log(jqXHR);
        showErrorMsg("Error", textStatus.toString());
      });

    req.always(function(){
      
    });
  }
}