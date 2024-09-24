import { router } from '../../app.js';

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
}

function getValueOfCheckedPlan() {
  let radio1 = document.getElementById("radio1");
  let radio2 = document.getElementById("radio2");
  let radio3 = document.getElementById("radio3");

  if (radio1.checked) {return radio1.value;}
  if (radio2.checked) {return radio2.value;}
  if (radio3.checked) {return radio3.value;}
}

//returns the maximum number of people that can be covered
//under this plan
function getCoverLimit() {
  let plan = getValueOfCheckedPlan();

  if (plan == "Basic"){return 5;}
  else if (plan == "Flex") {return 10;}
  else if (plan == "Premium") {return 15}    
}

export function requestSignup() {
  let termsAgreed = newUserTsAndCsAgreed();

  if (!termsAgreed){
    return;
  } else if(termsAgreed){
    let raw = null;

    if (USER_TYPE == "AGENT") {
      raw = JSON.stringify(agentRegisterInfo());
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
  console.log("tyhh")
  document.getElementById("max-people").innerText = `This plan covers a maximum of ${getCoverLimit()} people.`;

  let name = document.getElementById("person_name").value;
  let id   = document.getElementById("person_id").value;

  if (name != '' && id != '') {
      
    if (coveredPeople.length < getCoverLimit()){
      var coveredPerson = {
        fullname: name, 
        national_id: id
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

  document.getElementById("person_name").value = '';
  document.getElementById("person_id").value   = '';
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
            Remove
          </span>
        </a>
      </li>`);

    document.getElementById(index).addEventListener('click', (event) => {
      removePerson(index);
    });   
  }
}

function selfRegisterInfo() {
  return {
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
      //covered people
      "covered_people": coveredPeople,
      //Payment details
      "payment_method": document.getElementById("payment-method").value,
      "payment_date": document.getElementById("payment-date").value
    }
}

function agentRegisterInfo() {
  return {
      //general info
      "registration_type": "agent",
      "agent_id": AGENT_ID,
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
  document.getElementById("c3").innerText = document.getElementById("new-user-dob").value;
  document.getElementById("c4").innerText = document.getElementById("new-user-nid").value;
  document.getElementById("c5").innerText = document.getElementById("new-user-g").value;
  document.getElementById("c6").innerText = document.getElementById("new-user-ms").value;
  
  //Beneficiary details
  document.getElementById("c7").innerText = document.getElementById("b-fn").value;
  document.getElementById("c8").innerText = document.getElementById("b-ln").value;
  document.getElementById("c9").innerText = document.getElementById("b-dob").value;
  document.getElementById("c10").innerText = document.getElementById("b-nid").value;
  document.getElementById("c11").innerText = document.getElementById("b-phone").value;
  document.getElementById("c12").innerText = document.getElementById("b-rel").value;
  //covered people
  confirmCoveredList();
  //Plan details
  document.getElementById("c14").innerText = getValueOfCheckedPlan();
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



