import { router } from '../../app.js';
let coveredPeople  = [];
let beneficiaries  = [];

export function NewUserAjax() {

  const verifyButton = document.getElementById('complete_signup');
  verifyButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      requestSignup();
  });

  const addBtn = document.getElementById("add_person_btn");
  addBtn.addEventListener('click', (event) => {
    addPerson();
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

  const step6 = document.getElementById('step6');
  step6.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      confirmInfo();
  });

  const coverFun = () => {
    let cover  = document.getElementById("coverRange").value;
    let pmCost = calcMonthlyCost(cover);
    document.getElementById("currentRange").innerText = "Cover value E"+Number(cover).toFixed(2)+" for E"+Number(pmCost).toFixed(2)+" p/m.";
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

//returns the maximum number of people that can be covered
//under this plan
function getCoverLimit() {
  return 9;  
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
        if (data.message == "Success" || data.message == "success") {
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

function addPerson() {
  document.getElementById("max-people").innerText = `This plan covers a maximum of ${getCoverLimit()} people.`;

  let name = document.getElementById("person_fname").value+" "+document.getElementById("person_lname").value;
  let id   = document.getElementById("person_id").value;
  let rel  = document.getElementById("person_rel").value;
  let gen  = document.getElementById("person_gen").value;

  if (name != '' && id != '') {
      
    if (coveredPeople.length < getCoverLimit()){
      var coveredPerson = {
        fullname: name, 
        national_id: id,
        relationship: rel,
        gender: gen
      };
      coveredPeople.push(coveredPerson); 
    } else {
      showErrorMsg("Error", "You have reached the limit of people that can be covered under this plan. Choose another plan if you need to cover more people.");
    }
  } else {
    showErrorMsg("Error", "The name and national id must be entered.");
    return;
  }

  showCoveredList();

  document.getElementById("person_fname").value = '';
  document.getElementById("person_lname").value = '';
  document.getElementById("person_id").value   = '';
  document.getElementById("person_rel").value = '';
  document.getElementById("person_gen").value = '';
}

function removePerson(index) {
  event.preventDefault();
  coveredPeople.splice(index, 1);
  showCoveredList();
}

function showCoveredList() {
  let cList = document.getElementById("covered_list");
  cList.innerHTML = '';

  for (var i = coveredPeople.length - 1; i >= 0; i--) { 
    let index = i;
    cList.insertAdjacentHTML('beforeend', 
      `<li>
        ${coveredPeople[i].fullname}
        ${coveredPeople[i].national_id}
        <a href="#" id="${index}" >
          <span class="badge badge-sm bg-gradient-danger">
              X
          </span>
        </a>
      </li>`);

    document.getElementById(index).addEventListener('click', (event) => {
      removePerson(index);
    });   
  }
}

function selfRegisterInfo() {
  let cover  = document.getElementById("coverRange").value;
  return {
      //general info
      "registration_type": "unassisted",
      //Customer details
      "phone_number": USER_PHONE,
      "client_fname": document.getElementById("new-user-fn").value,
      "client_lname": document.getElementById("new-user-ln").value,
      "client_email": document.getElementById("new-user-email").value,
      "client_pin": document.getElementById("new-user-nid").value,
      //Plan details
      "cover_value": cover,
      "monthly_cost": calcMonthlyCost(cover),
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
  let cover  = document.getElementById("coverRange").value;
  return {
      //general info
      "registration_type": "agent",
      "agent_id": AGENT_ID,
      //Customer details
      "phone_number": USER_PHONE,
      "client_fname": document.getElementById("new-user-fn").value,
      "client_lname": document.getElementById("new-user-ln").value,
      "client_email": document.getElementById("new-user-email").value,
      "client_pin": document.getElementById("new-user-nid").value,
      //Plan details
      "cover_value": cover,
      "monthly_cost": calcMonthlyCost(cover),
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
  document.getElementById("c1").innerText = document.getElementById("new-user-fn").value;
  document.getElementById("c2").innerText = document.getElementById("new-user-ln").value;
  document.getElementById("c4").innerText = document.getElementById("new-user-email").value;
  document.getElementById("c3").innerText = document.getElementById("new-user-nid").value;
  
  //Beneficiary details
  confirmBeneficiaryList();
  //covered people
  confirmCoveredList();
  //Plan details
  let cover  = document.getElementById("coverRange").value;
  document.getElementById("c11").innerText = calcMonthlyCost(cover);
  document.getElementById("c14").innerText = cover;
  //Payment details
  document.getElementById("c15").innerText = document.getElementById("payment-method").value;
  document.getElementById("c16").innerText = document.getElementById("payment-date").value;
    
}

function confirmCoveredList() {
  let cList = document.getElementById("c13");
  cList.innerHTML = '';

  for (var i = coveredPeople.length - 1; i >= 0; i--) { 
    let index = i;
    cList.insertAdjacentHTML('beforeend', 
      `<li>
        ${coveredPeople[i].fullname}
        ${coveredPeople[i].national_id}
      </li>`);
 
  }
}

function confirmBeneficiaryList() {
  let cList = document.getElementById("c12");
  cList.innerHTML = '';

  for (var i = beneficiaries.length - 1; i >= 0; i--) { 
    let index = i;
    cList.insertAdjacentHTML('beforeend', 
      `<li>
        ${beneficiaries[i].fullname}
        ${beneficiaries[i].national_id}
      </li>`);
 
  }
}

function addBeneficiary() {
  let name    = document.getElementById("ben_name").value;
  let id      = document.getElementById("ben_id").value;
  let rel     = document.getElementById("ben_rel").value;
  let phone_n = document.getElementById("ben_phone").value;
  let email   = document.getElementById("ben_email").value;
  let percent = document.getElementById("ben_percentage").value;

  if (name != '' && id != '') {
      
    var ben = {
      fullname: name, 
      national_id: id,
      relationship: rel,
      phone: phone_n,
      email: email,
      percentage: percent
    };
    beneficiaries.push(ben);
    
  } else {
    showErrorMsg("Error", "The name and national id must be entered.");
    return;
  }

  showBeneficiaryList();

  document.getElementById("ben_name").value       = '';
  document.getElementById("ben_id").value         = '';
  document.getElementById("ben_rel").value        = '';
  document.getElementById("ben_phone").value      = '';
  document.getElementById("ben_email").value      = '';
  document.getElementById("ben_percentage").value = '';
}

function showBeneficiaryList() {
  let cList = document.getElementById("beneficiary_list");
  cList.innerHTML = '';

  for (var i = beneficiaries.length - 1; i >= 0; i--) { 
    let index = i;
    cList.insertAdjacentHTML('beforeend', 
      `<li>
        ${beneficiaries[i].fullname}
        ${beneficiaries[i].national_id}
        <a href="#" id="b-${index}" >
          <span class="badge badge-sm bg-gradient-danger">
              X
          </span>
        </a>
      </li>`);

    document.getElementById("b-"+index).addEventListener('click', (event) => {
      removeBeneficiary("b-"+index);
    });   
  }
}

function removeBeneficiary(index) {
  event.preventDefault();
  beneficiaries.splice(index, 1);
  showBeneficiaryList();
}

function calcMonthlyCost(value) {
  switch (Number(value)){
    case 5000:
      return 15;
      break;
    case 10000:
      return 20;
      break;
    case 15000:
      return 25;
      break;
    case 20000:
      return 30;
      break;
    case 25000:
      return 35;
      break;
    case 30000:
      return 40;
      break;
    case 35000:
      return 45;
      break;
    case 40000:
      return 50;
      break;
    case 45000:
      return 55;
      break;
    case 50000:
      return 60;
      break;
  }
}



