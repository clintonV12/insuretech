let beneficiaries  = [];

function confirmBeneficiaryList() {
  let cList = document.getElementById("c12");
  cList.innerHTML = '';

  for (var i = beneficiaries.length - 1; i >= 0; i--) { 
    let index = i;
    cList.insertAdjacentHTML('beforeend', 
      `<li>
        ${beneficiaries[i].fullname.toUpperCase()}
        
        <ul>
          <li>ID: ${beneficiaries[i].national_id}</li>
          <li>Phone Number: ${beneficiaries[i].phone}</li>
        </ul>
      </li>`);
 
  }
}

function addBeneficiary() {
  let errorElement = document.getElementById("bErrorMsg");
  let errorMessages = [];

  let name    = document.getElementById("ben_name").value;
  let phone_n = document.getElementById("ben_phone").value;
  let id      = document.getElementById("ben_id").value;
  let rel     = document.getElementById("ben_rel").value;

  // Validate each field
  let fullNameValidation = validateFullName(name);
  let phoneValidation    = validatePhoneNumber(phone_n);
  let idValidation       = validateIDNumber(id);

  // Check validation results and gather error messages
  if (fullNameValidation !== true) {
    errorMessages.push("Full Name: " + fullNameValidation);
  }
  if (phoneValidation !== true) {
    errorMessages.push("Phone Number: " + phoneValidation);
  }
  if (idValidation !== true) {
    errorMessages.push("National ID: " + idValidation);
  }
  if (rel == "") {
    errorMessages.push("Relationship: " + "You must select relationship.");
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
      national_id: id,
      phone: phone_n,
      relationship: rel
    };
    beneficiaries.push(ben);
    document.getElementById("bErrorMsg").classList.remove('text-danger');
    document.getElementById("bErrorMsg").classList.add('text-success');
    document.getElementById("bErrorMsg").innerText = `${name.toUpperCase()} has been added as a beneficiary.`;

    showBeneficiaryList();
    document.getElementById("ben_name").value  = '';
    document.getElementById("ben_phone").value = '';
    document.getElementById("ben_id").value   = '';
    document.getElementById("ben_rel").value   = '';

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
      <li>
        <span class="text-sm">
          ${beneficiaries[i].fullname.toUpperCase()}
          (<a href="#" class="text-danger text-sm icon-move-right my-auto" id="b-${index}">
            Delete
            <i class="bx bx-trash text-xs ms-1" aria-hidden="true"></i>
          </a>)
        </span>
        <ul>
          <li>ID: ${beneficiaries[i].national_id}</li>
          <li>Phone Number: ${beneficiaries[i].phone}</li>
        </ul>
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