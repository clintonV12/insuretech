import { router } from '../../../app.js';

export function NewUserAjax() {
  setNavWizardEvents();

  if (KYC_CONSENT) {
    console.log("running kyc stuff");
    showLoadingBtn("Getting your KYC data");
    requestUserKYC();
  }

  const verifyButton = document.getElementById('complete_signup');
  verifyButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      requestSignup();
  });

  const addBtn = document.getElementById("add_person_btn");
  addBtn.addEventListener('click', (event) => {
    let result = validateToAddPerson();

    if (result == true) {
      $("#new_person").modal("hide");
      const modal = new bootstrap.Modal('#cover_value_selector');
      modal.show();

      chooseCoverLevel();
      const confirm = document.getElementById("confirm-family-plan");
      
      confirm.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default form submission behavior
          $("#cover_value_selector").modal("hide");
          addPerson();
      });

    } else {
      console.log("It is false")
    }
    
  });

  const addBen = document.getElementById("add_ben_btn");
  addBen.addEventListener('click', (event) => {
    addBeneficiary();
  });

  const btn4 = document.getElementById('next_btn4');
  btn4.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      confirmInfo();
  });

  const step5 = document.getElementById('step5');
  step5.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      confirmInfo();
  });

  const coverFun = () => {
    let range  = document.getElementById("coverRange").value;
    let cover  = coverType(range);
    document.getElementById("currentRange").innerText = "Cover value E"+Number(cover.Cover).toFixed(2)+" for E"+Number(cover.Premium).toFixed(2)+" p/m.";
    document.getElementById("max-people").innerText = "";
    schemeMemberCover = cover;
  }
  coverFun();
  
  const range = document.getElementById('coverRange');
  range.addEventListener('mouseup', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      coverFun();
  });

  range.addEventListener('touchend', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      coverFun();
  });

}

export function requestSignup() {
  let termsAgreed = newUserTsAndCsAgreed();

  if (!termsAgreed){
    return;
  } else if(termsAgreed){
    let raw = null;

    if (USER_TYPE == "AGENT") {
      raw = JSON.stringify(agentRegisterInfo());
      console.log("agent id:"+AGENT_ID);
    }
    else if(USER_TYPE == "CLIENT"){
      raw = JSON.stringify(selfRegisterInfo());
    }

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
        if (data.message == "Registration was successful, you will receive your policy document by email.") {
          if (USER_TYPE == "AGENT") {
            pagename = 'agent-dashboard';
            router();
          }
          else if(USER_TYPE == "CLIENT"){
            pagename = 'dashboard';
            router();
          }
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

function selfRegisterInfo() {
  let userNationalID = document.getElementById("new-user-nid").value;
  return {
      //general info
      "registration_type": "unassisted",
      //Customer details
      "phone_number": USER_PHONE,
      "client_fname": document.getElementById("new-user-fn").value,
      "client_lname": document.getElementById("new-user-ln").value,
      "client_email": document.getElementById("new-user-email").value,
      "client_pin": userNationalID,
      "client_gender": getDetailsFromIDNumber(userNationalID).Gender,
      //Plan details
      "cover_value": schemeMemberCover.Cover,
      "monthly_cost": schemeMemberCover.Premium,
      "plan_name":schemeMemberCover.Plan,
      "total_monthly_cost":calculatePremiumSum(),
      "cover_category":COVER_TYPE,
      "total_cover_amount":calculateBenefitSum(),
      //Beneficiary details
      "beneficiary": beneficiaries,
      //covered people
      "covered_people": coveredPeople,
      //Payment details
      "payment_method": document.getElementById("payment-method").value,
      "payment_date": document.getElementById("payment-date").value
    }
}

function agentRegisterInfo() {
  let userNationalID = document.getElementById("new-user-nid").value;
  return {
      //general info
      "registration_type": "agent",
      "agent_id": AGENT_ID,
      //Customer details
      "phone_number": USER_PHONE,
      "client_fname": document.getElementById("new-user-fn").value,
      "client_lname": document.getElementById("new-user-ln").value,
      "client_email": document.getElementById("new-user-email").value,
      "client_pin": userNationalID,
      "client_gender": getDetailsFromIDNumber(userNationalID).Gender,
      //Plan details
      "cover_value": schemeMemberCover.Cover,
      "monthly_cost": schemeMemberCover.Premium,
      "plan_name":schemeMemberCover.Plan,
      "total_monthly_cost":calculatePremiumSum(),
      "cover_category":COVER_TYPE,
      "total_cover_amount":calculateBenefitSum(),
      //Beneficiary details
      "beneficiary": beneficiaries,
      //covered people
      "covered_people": coveredPeople,
      //Payment details
      "payment_method": document.getElementById("payment-method").value,
      "payment_date": document.getElementById("payment-date").value
    }
}

function confirmInfo() {
  document.getElementById("c1").innerText = document.getElementById("new-user-fn").value.toUpperCase();
  document.getElementById("c2").innerText = document.getElementById("new-user-ln").value.toUpperCase();
  document.getElementById("c4").innerText = document.getElementById("new-user-email").value;
  document.getElementById("c3").innerText = document.getElementById("new-user-nid").value;
  
  //Beneficiary details
  confirmBeneficiaryList();
  //covered people
  confirmCoveredList();
  //Plan details
  document.getElementById("c11").innerText = `E${Number(calculatePremiumSum()).toFixed(2)}`;
  document.getElementById("c14").innerText = getCoverType();
  //Payment details
  document.getElementById("c15").innerText = document.getElementById("payment-method").value;
  document.getElementById("c16").innerText = document.getElementById("payment-date").value;
    
}

function requestUserKYC() {
  const raw = JSON.stringify({
      "client_phone_kyc": USER_PHONE,
    });

  var req = $.ajax({
    "url": SERVER_URL + "client",
    "method": "POST",
    "data": raw,
    "headers": {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
      }
  });

  req.done(function(data){
      
      if (data.code) {
      // Handle successful response with user info
      const userInfo = {
        firstName: data.body.given_name.split(" ")[0], // Extracts only the first part
        lastName: data.body.family_name,
      };

      document.getElementById("new-user-fn").value = userInfo.firstName;
      document.getElementById("new-user-ln").value = userInfo.lastName;
    } else if (data.error) {
      // Handle error response
      console.error("Error:", data.error);
      showErrorMsg("Error", data.error.message || "An error occurred");
    } else {
      // Handle any other type of response
      console.log("Response:", data);
      // Display or handle this unexpected response as needed
      showErrorMsg("Error", data.toString());
    }
  });

  req.fail(function(jqXHR, textStatus, errorThrown){
    //if the call is not successful
    console.log(jqXHR);
    showErrorMsg("Error", textStatus.toString());
  });

  req.always(function(){
    hideLoadingBtn();
  });
  
}

function coverType(value) {
  switch (Number(value)){
    case 1:
      return {"Premium":7.50, "Cover":5000, "Plan":"MA"};
      break;
    case 2:
      return {"Premium":15.00, "Cover":10000, "Plan":"MB"};
      break;
    case 3:
      return {"Premium":30.00, "Cover":20000, "Plan":"MC"};
      break;
    case 4:
      return {"Premium":45.00, "Cover":30000, "Plan":"MD"};
      break;
    case 5:
      return {"Premium":60.00, "Cover":40000, "Plan":"ME"};
      break;
    case 6:
      return {"Premium":70.00, "Cover":50000, "Plan":"MF"};
      break;
  }
}

function calculatePremiumSum() {
  let sum = schemeMemberCover.Premium;

  for (var i = 0; i < coveredPeople.length; i++) {
    sum += coveredPeople[i].monthly_premium;
  }

  return sum;
}

function calculateBenefitSum() {
  let sum = schemeMemberCover.Cover;

  for (var i = 0; i < coveredPeople.length; i++) {
    sum += coveredPeople[i].benefit_amount;
  }

  return sum;
}