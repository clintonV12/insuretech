import { router } from '../../app.js';
let coveredPeople  = [];
let beneficiaries  = [];

export function NewUserAjax() {
  
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
  let num_people = 0;

  if (COVER_TYPE == "MEMBER") {
    num_people = 1;
  }
  else if (COVER_TYPE == "FAMILY") {
    num_people = 10;
  }

  document.getElementById("max-people").innerText = `This plan covers a maximum of ${num_people} people.`;

  return num_people;
}

function countPerType() {
  let count = {"Spouse":0, "Child":0, "Parent_GrandParent":0, "Extended":0}

  for (var i = coveredPeople.length - 1; i >= 0; i--) {
    if(coveredPeople[i].relationship == "Spouse") {count.Spouse = count.Spouse + 1;}
    else if(coveredPeople[i].relationship == "Child") {count.Child = count.Child + 1;}
    else if(coveredPeople[i].relationship == "Parent_GrandParent") {count.Parent_GrandParent = count.Parent_GrandParent + 1;}
    else {count.Extended = count.Extended + 1;}
  }

  return count;
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

function addPerson() {
  let errorElement = document.getElementById("bErrorMsg2");
  let errorMessages = [];

  let fname = document.getElementById("person_fname").value;
  let lname = document.getElementById("person_lname").value;
  let id    = document.getElementById("person_id").value;
  let rel   = document.getElementById("person_rel").value;
  let gen   = document.getElementById("person_gen").value;

  // Validate each field
  let firstNameValidation = validateName(fname);
  let lastNameValidation  = validateName(fname);
  let idNumberValidation  = validateIDNumber(id);

  // Check validation results and gather error messages
  if (firstNameValidation !== true) {
    errorMessages.push("First Name: " + firstNameValidation);
  }
  if (lastNameValidation !== true) {
    errorMessages.push("Last Name: " + lastNameValidation);
  }
  if (idNumberValidation !== true) {
    errorMessages.push("ID Number: " + idNumberValidation);
  }
  if (rel == "") {
    errorMessages.push("Relationship: " + "You must select relationship.");
  }
  if (gen == "") {
    errorMessages.push("Gender: " + "You must select gender.");
  }

  // Display error message or proceed if no errors
  if (errorMessages.length > 0) {
    document.getElementById("bErrorMsg2").classList.remove('text-success');
    document.getElementById("bErrorMsg2").classList.add('text-danger');
    errorElement.innerText = "Please correct the following errors:\n" + errorMessages.join("\n");
    return false;
  } else {
    errorElement.innerText = ""; // Clear any previous errors

    if (coveredPeople.length < getCoverLimit()){
      if (countPerType().Spouse == 1 && rel == "Spouse") {
        showInfoMsg("Alert", "You can only add 1 spouse");
      }
      else if (countPerType().Child == 6 && rel == "Child") {
        showInfoMsg("Alert", "You can only add 6 children");
      }
      else if (countPerType().Extended == 4 && rel == "Extended") {
        showInfoMsg("Alert", "You can only add 4 extended family members.");
      }
      else if (countPerType().Parent_GrandParent == 4 && rel == "Parent_GrandParent") {
        showInfoMsg("Alert", "You can only add 2 parents and 2 grandparents");
      } else {
        var coveredPerson = {
          fullname: fname + " " + lname, 
          national_id: id,
          relationship: rel,
          gender: gen
        };
        coveredPeople.push(coveredPerson);
        document.getElementById("bErrorMsg2").classList.remove('text-danger');
        document.getElementById("bErrorMsg2").classList.add('text-success');
        document.getElementById("bErrorMsg2").innerText = `${fname.toUpperCase()} ${lname.toUpperCase()} has been added to the list.`;

        showCoveredList();
        document.getElementById("person_fname").value = '';
        document.getElementById("person_lname").value = '';
        document.getElementById("person_id").value    = '';
        document.getElementById("person_rel").value   = '';
        document.getElementById("person_gen").value   = '';
        countPerType();
      }
    } else {
      showErrorMsg("Error", "You have reached the limit of people that can be covered under this plan. Choose another plan if you need to cover more people.");
    }
    return true;
  }
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
      `
      <li class="list-group-item d-flex justify-content-between align-items-start mb-1">
        ${coveredPeople[i].fullname}
        ${coveredPeople[i].national_id}
        <span class="badge badge-danger badge-pill" id="${index}">X</span>
      </li>`);

    document.getElementById(index).addEventListener('click', (event) => {
      removePerson(index);
    });   
  }
}

function selfRegisterInfo() {
  let range  = document.getElementById("coverRange").value;
  let cover  = coverType(range);
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
      "cover_value": cover.Cover,
      "monthly_cost": cover.Premium,
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
  let range  = document.getElementById("coverRange").value;
  let cover  = coverType(range);
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
      "cover_value": cover.Cover,
      "monthly_cost": cover.Premium,
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
  let range  = document.getElementById("coverRange").value;
  let cover  = coverType(range);
  document.getElementById("c11").innerText = cover.Premium;
  document.getElementById("c14").innerText = cover.Cover;
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
        ${coveredPeople[i].fullname.toUpperCase()}
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
        ${beneficiaries[i].fullname.toUpperCase()}
        ${beneficiaries[i].phone}
      </li>`);
 
  }
}

function addBeneficiary() {
  let errorElement = document.getElementById("bErrorMsg");
  let errorMessages = [];

  let name    = document.getElementById("ben_name").value;
  let phone_n = document.getElementById("ben_phone").value;
  let dob     = document.getElementById("ben_dob").value;

  // Validate each field
  let fullNameValidation = validateFullName(name);
  let phoneValidation    = validatePhoneNumber(phone_n);
  let dateValidation     = validateDateOfBirth(dob);

  // Check validation results and gather error messages
  if (fullNameValidation !== true) {
    errorMessages.push("Full Name: " + fullNameValidation);
  }
  if (phoneValidation !== true) {
    errorMessages.push("Phone Number: " + phoneValidation);
  }
  if (dateValidation !== true) {
    errorMessages.push("Date of Birth: " + dateValidation);
  }

  // Display error message or proceed if no errors
  if (errorMessages.length > 0) {
    document.getElementById("bErrorMsg").classList.remove('text-success');
    document.getElementById("bErrorMsg").classList.add('text-danger');
    errorElement.innerText = "Please correct the following errors:\n" + errorMessages.join("\n");
    return false;
  } else {
    errorElement.innerText = ""; // Clear any previous errors

    var ben = {
      fullname: name, 
      date_of_birth: dob,
      phone: phone_n
    };
    beneficiaries.push(ben);
    document.getElementById("bErrorMsg").classList.remove('text-danger');
    document.getElementById("bErrorMsg").classList.add('text-success');
    document.getElementById("bErrorMsg").innerText = `${name.toUpperCase()} has been added as a beneficiary.`;

    showBeneficiaryList();
    document.getElementById("ben_name").value  = '';
    document.getElementById("ben_phone").value = '';
    document.getElementById("ben_dob").value   = '';

    return true;
  }
}

function showBeneficiaryList() {
  let cList = document.getElementById("beneficiary_list");
  cList.innerHTML = '';

  for (var i = beneficiaries.length - 1; i >= 0; i--) { 
    let index = i;
    cList.insertAdjacentHTML('beforeend', 
      `
      <li class="list-group-item d-flex justify-content-between align-items-start mb-1">
        ${beneficiaries[i].fullname}
        ${beneficiaries[i].phone}
        <span class="badge badge-danger badge-pill" id="b-${index}">X</span>
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

function coverType(value) {
  switch (Number(value)){
    case 5000:
      if (COVER_TYPE == "FAMILY") {return {"Premium":50, "Cover":5000, "Limit":1};}
      else {return {"Premium":20, "Cover":5000, "Limit":1};}
      break;
    case 10000:
      if (COVER_TYPE == "FAMILY") {return {"Premium":75, "Cover":10000, "Limit":1};}
      else {return {"Premium":30, "Cover":10000, "Limit":1};}
      break;
    case 15000:
      if (COVER_TYPE == "FAMILY") {return {"Premium":100, "Cover":15000, "Limit":1};}
      else {return {"Premium":40, "Cover":15000, "Limit":1};}
      break;
    case 20000:
      if (COVER_TYPE == "FAMILY") {return {"Premium":125, "Cover":20000, "Limit":1};}
      else {return {"Premium":50, "Cover":20000, "Limit":1};}
      break;
    case 25000:
      if (COVER_TYPE == "FAMILY") {return {"Premium":150, "Cover":25000, "Limit":1};}
      else {return {"Premium":60, "Cover":25000, "Limit":1};}
      break;
    case 30000:
      if (COVER_TYPE == "FAMILY") {return {"Premium":175, "Cover":30000, "Limit":1};}
      else {return {"Premium":70, "Cover":30000, "Limit":1};}
      break;
    case 35000:
      if (COVER_TYPE == "FAMILY") {return {"Premium":200, "Cover":35000, "Limit":1};}
      else {return {"Premium":80, "Cover":35000, "Limit":1};}
      break;
    case 40000:
      if (COVER_TYPE == "FAMILY") {return {"Premium":225, "Cover":40000, "Limit":1};}
      else {return {"Premium":90, "Cover":40000, "Limit":1};}
      break;
    case 45000:
      if (COVER_TYPE == "FAMILY") {return {"Premium":250, "Cover":45000, "Limit":1};}
      else {return {"Premium":100, "Cover":45000, "Limit":1};}
      break;
    case 50000:
      if (COVER_TYPE == "FAMILY") {return {"Premium":275, "Cover":50000, "Limit":1};}
      else {return {"Premium":110, "Cover":50000, "Limit":1};}
      break;
  }
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



