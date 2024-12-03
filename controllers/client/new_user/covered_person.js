let coveredPeople         = [];
let schemeMemberCover     = "";
let hasConfirmedCover     = false; //confirmation status for scheme members cover
const MAX_EXTENDED_FAMILY = 9;
const MAX_GRAND_PARENTS   = 4;
const MAX_ADDED_SPOUSES   = 2;
const MAX_SPOUSE          = 1;
const MAX_AGE             = 70;
const MAX_GRANDPARENT_AGE = 85;
const MIN_MEMBER_AGE      = 18;

function chooseCoverType(cover_type) {
  COVER_TYPE = cover_type;

  document.getElementById("coverType").innerText = getCoverType();

  const coverBtns  = document.getElementById("cover-btns");
  coverBtns.classList.toggle("d-none"); //hide cover type buttons

  showSchemeMemberCoverSlider();
  confirmSchemeMemberCoverSelection();
}

function showSchemeMemberCoverSlider() {
  const coverBtns  = document.getElementById("cover-btns");
  const familyPlan = document.getElementById("family_plan");
  const undoBtn    = document.getElementById("undo_btn");
  const coverSlide = document.getElementById('cover_slide');

  familyPlan.classList.toggle("d-none"); //show cover slider

  coverSlide.addEventListener('click', (event) => {
      //event.preventDefault(); // Prevent default form submission behavior
      if (coverBtns.classList.contains("d-none")) { 
        undoBtn.classList.remove("d-none");
      } else {
        undoBtn.classList.add("d-none");
      }
  });
}

function confirmSchemeMemberCoverSelection() {
  const confirmPlan = document.getElementById('confirm-plan');
  confirmPlan.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      hasConfirmedCover = true;

      if (hasConfirmedCover) {
        const extended        = document.getElementById("extended-cover");
        const familyPlan      = document.getElementById("family_plan");
        const coverPeopleList = document.getElementById("c-list");

        // Check if 'extended-cover' is currently hidden
        const isHidden = extended.classList.contains("d-none");

        if (isHidden) {
          extended.classList.toggle("d-none");
          coverPeopleList.classList.toggle("d-none");
          familyPlan.classList.add("d-none");
        }

        var addDependants = document.getElementById("add_dependants").checked;
        if (addDependants) {
          toggleRelationshipSelect("Dependants");
          const modal = new bootstrap.Modal('#new_person');
          modal.show();
        }
      }
  });
}

function undoChooseCover() {
  hasConfirmedCover = false;//cancel cover confirmation

  const familyPlan = document.getElementById("family_plan");
  familyPlan.classList.add("d-none");

  const coverBtns = document.getElementById("cover-btns");
  coverBtns.classList.remove("d-none");

  const coverPeopleList = document.getElementById("c-list");
  coverPeopleList.classList.add("d-none");

  const extended = document.getElementById("extended-cover");
  extended.classList.add("d-none");

  //reset slider information
  //document.getElementById("currentRange").innerText = "";
  document.getElementById("max-people").innerText = "";
}

function validateToAddPerson() {
  let errorElement = document.getElementById("bErrorMsg2");
  let errorMessages = [];

  let fname = document.getElementById("person_fname").value;
  let lname = document.getElementById("person_lname").value;
  let id    = document.getElementById("person_id").value;
  let rel   = document.getElementById("person_rel").value;

  // Validate each field
  let firstNameValidation = validateName(fname);
  let lastNameValidation  = validateName(lname);
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

  let ageRestriction = isWithinValidAgeRestriction(rel, id);
  if (!ageRestriction) {
    errorMessages.push("Age: " + "This person does not meet our age restrictions.");
  }

  // Display error message or proceed if no errors
  if (errorMessages.length > 0) {
    document.getElementById("bErrorMsg2").classList.remove('text-success');
    document.getElementById("bErrorMsg2").classList.add('text-danger');
    errorElement.innerText = "Please correct the following errors:\n" + errorMessages.join("\n");
    return false;
  } else {
    errorElement.innerText = ""; // Clear any previous errors
    
    if (countPerType().Spouse == MAX_SPOUSE && rel == "Spouse") {
      showInfoMsg("Alert", `You can only add ${MAX_SPOUSE} spouse, select additional spouse if you wish to proceed.`);
    }
    else if (countPerType().Additional_Spouse == MAX_ADDED_SPOUSES && rel == "Additional_Spouse") {
      showInfoMsg("Alert", `You can only add a maximum of ${MAX_ADDED_SPOUSES} additional spouses.`);
    }
    else if (countPerType().Domestic_Worker == 4 && rel == "Domestic_Worker") {
      showInfoMsg("Alert", "You can only add 4 domestic workers");
    }
    else if (countPerType().Parent == 2 && rel == "Parent") {
      showInfoMsg("Alert", "You can only add 2 parents");
    }
    else if (countPerType().Inlaw == 2 && rel == "Inlaw") {
      showInfoMsg("Alert", "You can only add 2 Inlaws");
    }
    else if (countPerType().Extended == MAX_EXTENDED_FAMILY && rel == "Extended") {
      showInfoMsg("Alert", `You can only add ${MAX_EXTENDED_FAMILY} extended family members.`);
    }
    else if (countPerType().GrandParent == MAX_GRAND_PARENTS && rel == "GrandParent") {
      showInfoMsg("Alert", `You can only add ${MAX_GRAND_PARENTS} grandparents`);
    } else {
      //add person here
      document.getElementById("bErrorMsg2").classList.remove('text-danger');
      document.getElementById("bErrorMsg2").classList.add('text-success');
      document.getElementById("bErrorMsg2").innerText = `${fname.toUpperCase()} ${lname.toUpperCase()} has been added to the list.`;
      return true;
    }
    
    return false;
  }
}

function addPerson() {
  let fname = document.getElementById("person_fname").value;
  let lname = document.getElementById("person_lname").value;
  let id    = document.getElementById("person_id").value;
  let rel   = document.getElementById("person_rel").value;
  let gen   = getDetailsFromIDNumber(id).Gender;

  //plan details
  let cover         = getFamilyCoverSliderInfo();
  let premium       = cover.Premium;
  let benefitAmount = cover.Cover;
  let plan          = cover.Plan;
  let relDetail     = cover.Relationship_Details; //detailed info about relationship with scheme member
  
  var coveredPerson = {
    fullname: fname + " " + lname, 
    national_id: id,
    relationship: rel,
    gender: gen,
    monthly_premium: premium,
    benefit_amount: benefitAmount,
    plan_name: plan,
    relationship_detail: relDetail
  };

  coveredPeople.push(coveredPerson);
 
  showCoveredList();
  document.getElementById("person_fname").value = '';
  document.getElementById("person_lname").value = '';
  document.getElementById("person_id").value    = '';
  document.getElementById("person_rel").value   = '';
  countPerType();

  //show new person form
  const modal = new bootstrap.Modal('#new_person');
  modal.show();
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
      <li>
        <span class="text-sm">
          ${coveredPeople[i].fullname.toUpperCase()}
          (<a href="#" class="text-danger text-sm icon-move-right my-auto" id="${index}">
            Delete
            <i class="bx bx-trash text-xs ms-1" aria-hidden="true"></i>
          </a>)
        </span>
        <ul>
          <li>ID: ${coveredPeople[i].national_id}</li>
          <li>Premium: E${Number(coveredPeople[i].monthly_premium).toFixed(2)} p/m</li>
          <li>Benefit: E${Number(coveredPeople[i].benefit_amount).toFixed(2)}</li>
        </ul>
      </li>`);

    document.getElementById(index).addEventListener('click', (event) => {
      removePerson(index);
    });   
  }
}

function confirmCoveredList() {
  let cList = document.getElementById("c13");
  cList.innerHTML = '';

  //Start by showing the policy holder in the covered people
  cList.insertAdjacentHTML('beforeend', 
    `<li>
      ${document.getElementById("new-user-fn").value.toUpperCase()} ${document.getElementById("new-user-ln").value.toUpperCase()}
      (Policy Holder)
      <ul>
        <li>ID: ${document.getElementById("new-user-nid").value}</li>
        <li>Premium: E${Number(schemeMemberCover.Premium).toFixed(2)} p/m</li>
        <li>Benefit: E${Number(schemeMemberCover.Cover).toFixed(2)}</li>
      </ul>
    </li>`
  );

  for (var i = coveredPeople.length - 1; i >= 0; i--) { 
    let index = i;
    cList.insertAdjacentHTML('beforeend', 
      `<li>
        ${coveredPeople[i].fullname.toUpperCase()}
        <ul>
          <li>ID: ${coveredPeople[i].national_id}</li>
          <li>Premium: E${Number(coveredPeople[i].monthly_premium).toFixed(2)} p/m</li>
          <li>Benefit: E${Number(coveredPeople[i].benefit_amount).toFixed(2)}</li>
        </ul>
      </li>`
    );
  }
}

function policyInfo(value, relationship) {
  switch (Number(value)){
    case 1:
      if (relationship == "Spouse") {
        return {"Premium":14.75, "Cover":5000, "Plan":"FA", "Relationship_Details":"Spouse"};
      } else if (relationship == "Child aged 14 - 21") {
        return {"Premium":14.75, "Cover":3000, "Plan":"FA", "Relationship_Details":"Child aged 14 - 21"};
      } else if (relationship == "Child aged 6 - 13") {
        return {"Premium":14.75, "Cover":1500, "Plan":"FA", "Relationship_Details":"Child aged 6 - 13"};
      } else if (relationship == "Child aged 1 - 5") {
        return {"Premium":14.75, "Cover":1000, "Plan":"FA", "Relationship_Details":"Child aged 1 - 5"};
      } else if (relationship == "Stillborn") {
        return {"Premium":14.75, "Cover":500, "Plan":"FA", "Relationship_Details":"Stillborn"};
      } else if (relationship == "Grandparents under 70") {
        return {"Premium":7.00, "Cover":5000, "Plan":"PEA", "Relationship_Details":"Grandparents under 70"};
      } else if (relationship == "Grandparents Over 70") {
        return {"Premium":42.50, "Cover":5000, "Plan":"PA", "Relationship_Details":"Grandparents Over 70"};
      } else if (relationship == "Extended Family Member") {
        return {"Premium":7.00, "Cover":5000, "Plan":"EFA", "Relationship_Details":"Extended Family Member"};
      } else if (relationship == "Child over 21") {
        return {"Premium":7.00, "Cover":5000, "Plan":"EFA", "Relationship_Details":"Child over 21"};
      } else if (relationship == "Parent") {
        return {"Premium":7.00, "Cover":5000, "Plan":"EFA", "Relationship_Details":"Parent"};
      } else if (relationship == "Inlaw") {
        return {"Premium":7.00, "Cover":5000, "Plan":"EFA", "Relationship_Details":"Inlaw"};
      } else if (relationship == "Domestic_Worker") {
        return {"Premium":7.00, "Cover":5000, "Plan":"EFA", "Relationship_Details":"Domestic_Worker"};
      } else if (relationship == "Additional_Spouse") {
        return {"Premium":7.00, "Cover":5000, "Plan":"EFA", "Relationship_Details":"Additional_Spouse"};
      }
      break;
    case 2:
      if (relationship == "Spouse") {
        return {"Premium":29.50, "Cover":10000, "Plan":"FB", "Relationship_Details":"Spouse"};
      } else if (relationship == "Child aged 14 - 21") {
        return {"Premium":29.50, "Cover":6000, "Plan":"FB", "Relationship_Details":"Child aged 14 - 21"};
      } else if (relationship == "Child aged 6 - 13") {
        return {"Premium":29.50, "Cover":3000, "Plan":"FB", "Relationship_Details":"Child aged 6 - 13"};
      } else if (relationship == "Child aged 1 - 5") {
        return {"Premium":29.50, "Cover":2000, "Plan":"FB", "Relationship_Details":"Child aged 1 - 5"};
      } else if (relationship == "Stillborn") {
        return {"Premium":29.50, "Cover":1000, "Plan":"FB", "Relationship_Details":"Stillborn"};
      } else if (relationship == "Grandparents under 70") {
        return {"Premium":14.00, "Cover":10000, "Plan":"PEB", "Relationship_Details":"Grandparents under 70"};
      } else if (relationship == "Grandparents Over 70") {
        return {"Premium":85.00, "Cover":10000, "Plan":"PB", "Relationship_Details":"Grandparents Over 70"};
      } else if (relationship == "Extended Family Member") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Extended Family Member"};
      } else if (relationship == "Child over 21") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFA", "Relationship_Details":"Child over 21"};
      } else if (relationship == "Parent") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Parent"};
      } else if (relationship == "Inlaw") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Inlaw"};
      } else if (relationship == "Domestic_Worker") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Domestic_Worker"};
      } else if (relationship == "Additional_Spouse") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Additional_Spouse"};
      }
      break;
    case 3:
      if (relationship == "Spouse") {
        return {"Premium":59.00, "Cover":20000, "Plan":"FC", "Relationship_Details":"Spouse"};
      } else if (relationship == "Child aged 14 - 21") {
        return {"Premium":59.00, "Cover":12000, "Plan":"FC", "Relationship_Details":"Child aged 14 - 21"};
      } else if (relationship == "Child aged 6 - 13") {
        return {"Premium":59.00, "Cover":6000, "Plan":"FC", "Relationship_Details":"Child aged 6 - 13"};
      } else if (relationship == "Child aged 1 - 5") {
        return {"Premium":59.00, "Cover":4000, "Plan":"FC", "Relationship_Details":"Child aged 1 - 5"};
      } else if (relationship == "Stillborn") {
        return {"Premium":59.00, "Cover":2000, "Plan":"FC", "Relationship_Details":"Stillborn"};
      } else if (relationship == "Grandparents under 70") {
        return {"Premium":14.00, "Cover":10000, "Plan":"PEB", "Relationship_Details":"Grandparents under 70"};
      } else if (relationship == "Grandparents Over 70") {
        return {"Premium":85.00, "Cover":10000, "Plan":"PB", "Relationship_Details":"Grandparents Over 70"};
      } else if (relationship == "Extended Family Member") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Extended Family Member"};
      } else if (relationship == "Child over 21") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFA", "Relationship_Details":"Child over 21"};
      } else if (relationship == "Parent") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Parent"};
      } else if (relationship == "Inlaw") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Inlaw"};
      } else if (relationship == "Domestic_Worker") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Domestic_Worker"};
      } else if (relationship == "Additional_Spouse") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Additional_Spouse"};
      }
      break;
    case 4:
      if (relationship == "Spouse") {
        return {"Premium":88.50, "Cover":30000, "Plan":"FD", "Relationship_Details":"Spouse"};
      } else if (relationship == "Child aged 14 - 21") {
        return {"Premium":88.50, "Cover":18000, "Plan":"FD", "Relationship_Details":"Child aged 14 - 21"};
      } else if (relationship == "Child aged 6 - 13") {
        return {"Premium":88.50, "Cover":9000, "Plan":"FD", "Relationship_Details":"Child aged 6 - 13"};
      } else if (relationship == "Child aged 1 - 5") {
        return {"Premium":88.50, "Cover":6000, "Plan":"FD", "Relationship_Details":"Child aged 1 - 5"};
      } else if (relationship == "Stillborn") {
        return {"Premium":88.50, "Cover":3000, "Plan":"FD", "Relationship_Details":"Stillborn", };
      } else if (relationship == "Grandparents under 70") {
        return {"Premium":14.00, "Cover":10000, "Plan":"PEB", "Relationship_Details":"Grandparents under 70"};
      } else if (relationship == "Grandparents Over 70") {
        return {"Premium":85.00, "Cover":10000, "Plan":"PB", "Relationship_Details":"Grandparents Over 70"};
      } else if (relationship == "Extended Family Member") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Extended Family Member"};
      } else if (relationship == "Child over 21") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFA", "Relationship_Details":"Child over 21"};
      } else if (relationship == "Parent") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Parent"};
      } else if (relationship == "Inlaw") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Inlaw"};
      } else if (relationship == "Domestic_Worker") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Domestic_Worker"};
      } else if (relationship == "Additional_Spouse") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Additional_Spouse"};
      }
      break;
    case 5:
      if (relationship == "Spouse") {
        return {"Premium":118.00, "Cover":40000, "Plan":"FE", "Relationship_Details":"Spouse"};
      } else if (relationship == "Child aged 14 - 21") {
        return {"Premium":118.00, "Cover":24000, "Plan":"FE", "Relationship_Details":"Child aged 14 - 21"};
      } else if (relationship == "Child aged 6 - 13") {
        return {"Premium":118.00, "Cover":12000, "Plan":"FE", "Relationship_Details":"Child aged 6 - 13"};
      } else if (relationship == "Child aged 1 - 5") {
        return {"Premium":118.00, "Cover":8000, "Plan":"FE", "Relationship_Details":"Child aged 1 - 5"};
      } else if (relationship == "Stillborn") {
        return {"Premium":118.00, "Cover":4000, "Plan":"FE", "Relationship_Details":"Stillborn"};
      } else if (relationship == "Grandparents under 70") {
        return {"Premium":14.00, "Cover":10000, "Plan":"PEB", "Relationship_Details":"Grandparents under 70"};
      } else if (relationship == "Grandparents Over 70") {
        return {"Premium":85.00, "Cover":10000, "Plan":"PB", "Relationship_Details":"Grandparents Over 70"};
      } else if (relationship == "Extended Family Member") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Extended Family Member"};
      } else if (relationship == "Child over 21") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFA", "Relationship_Details":"Child over 21"};
      } else if (relationship == "Parent") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Parent"};
      } else if (relationship == "Inlaw") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Inlaw"};
      } else if (relationship == "Domestic_Worker") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Domestic_Worker"};
      } else if (relationship == "Additional_Spouse") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Additional_Spouse"};
      }
      break;
    case 6:
      if (relationship == "Spouse") {
        return {"Premium":147.50, "Cover":50000, "Plan":"FF", "Relationship_Details":"Spouse"};
      } else if (relationship == "Child aged 14 - 21") {
        return {"Premium":147.50, "Cover":35000, "Plan":"FF", "Relationship_Details":"Child aged 14 - 21"};
      } else if (relationship == "Child aged 6 - 13") {
        return {"Premium":147.50, "Cover":15000, "Plan":"FF", "Relationship_Details":"Child aged 6 - 13"};
      } else if (relationship == "Child aged 1 - 5") {
        return {"Premium":147.50, "Cover":10000, "Plan":"FF", "Relationship_Details":"Child aged 1 - 5"};
      } else if (relationship == "Stillborn") {
        return {"Premium":147.50, "Cover":5000, "Plan":"FF", "Relationship_Details":"Stillborn"};
      } else if (relationship == "Grandparents under 70") {
        return {"Premium":14.00, "Cover":10000, "Plan":"PEB", "Relationship_Details":"Grandparents under 70"};
      } else if (relationship == "Grandparents Over 70") {
        return {"Premium":85.00, "Cover":10000, "Plan":"PB", "Relationship_Details":"Grandparents Over 70"};
      } else if (relationship == "Extended Family Member") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Extended Family Member"};
      } else if (relationship == "Child over 21") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Child over 21"};
      } else if (relationship == "Parent") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Parent"};
      } else if (relationship == "Inlaw") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Inlaw"};
      } else if (relationship == "Domestic_Worker") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Domestic_Worker"};
      } else if (relationship == "Additional_Spouse") {
        return {"Premium":14.00, "Cover":10000, "Plan":"EFB", "Relationship_Details":"Additional_Spouse"};
      }
      break;
  }
}

function relationshipResolver(relationship, national_id) {
  let age = getAgeFromIDNumber(national_id);

  switch(relationship) {
    case "Child":
      if (age >= 14 && age <= 21) {
        return "Child aged 14 - 21";
      } else if (age >= 6 && age <= 13 ) {
        return "Child aged 6 - 13";
      } else if (age >= 1 && age <= 5 ) {
        return "Child aged 1 - 5";
      } else if (age == 0 ) {
        return "Stillborn";
      } else if (age > 21 ) {
        return "Child over 21";
      }
      break;
    case "Spouse":
        return "Spouse";
      break;
    case "Additional_Spouse":
      return "Additional_Spouse";
      break;
    case "Brother_Sister":
    case "Uncle_Aunt":
    case "Nephew_Niece":
    case "Grandchild":
      return "Extended Family Member";
      break;
    case "GrandParent":
      if (age <= 70) {
        return "Grandparents under 70";
      } else if (age > 70) {
        return "Grandparents Over 70";
      }
      break;
    case "Parent":
      return "Parent";
      break;
    case "Inlaw":
      return "Inlaw";
      break;
    case "Domestic_Worker":
      return "Domestic_Worker";
      break;
  }
}

function countPerType() {
  let count = {
    "Spouse":0, 
    "Additional_Spouse":0, 
    "Child":0, 
    "GrandParent":0, 
    "Extended":0,
    "Domestic_Worker":0,
    "Parent":0,
    "Inlaw":0
  }

  for (var i = coveredPeople.length - 1; i >= 0; i--) {
    if(coveredPeople[i].relationship == "Spouse") {count.Spouse = count.Spouse + 1;}
    else if(coveredPeople[i].relationship == "Additional_Spouse") {count.Additional_Spouse = count.Additional_Spouse + 1;}
    else if(coveredPeople[i].relationship == "Child") {count.Child = count.Child + 1;}
    else if(coveredPeople[i].relationship == "GrandParent") {count.GrandParent = count.GrandParent + 1;}
    else if(coveredPeople[i].relationship == "Domestic_Worker") {count.Domestic_Worker = count.Domestic_Worker + 1;}
    else if(coveredPeople[i].relationship == "Parent") {count.Parent = count.Parent + 1;}
    else if(coveredPeople[i].relationship == "Inlaw") {count.Inlaw = count.Inlaw + 1;}
    else {count.Extended = count.Extended + 1;}
  }

  return count;
}

function chooseCoverLevel() {
  const modalRangeBtn = document.getElementById('coverRange2');
  modalRangeBtn.addEventListener('mouseup', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      getFamilyCoverSliderInfo();
  });

  modalRangeBtn.addEventListener('touchend', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      getFamilyCoverSliderInfo();
  });
}

function getFamilyCoverSliderInfo() {
  let id     = document.getElementById("person_id").value;
  let rel    = document.getElementById("person_rel").value;
  let range  = document.getElementById("coverRange2").value;

  let relVal = relationshipResolver(rel, id);
  let cover  = policyInfo(range, relVal);
  document.getElementById("currentRange2").innerText = "Cover value E"+Number(cover.Cover).toFixed(2)+" for E"+Number(cover.Premium).toFixed(2)+" p/m.";
  return cover;
}

function isWithinValidAgeRestriction(relationship, national_id) {
  let age = getAgeFromIDNumber(national_id);

  switch(relationship) {
    case "Scheme_Member":
      if (age < MIN_MEMBER_AGE || age > MAX_AGE) {
        return false;
      }
      break;
    case "Child":
      if (age > MAX_AGE) {
        return false;
      }
      break;
    case "Spouse":
    case "Additional_Spouse":
    case "Inlaw":
    case "Brother_Sister":
    case "Uncle_Aunt":
    case "Nephew_Niece":
    case "Grandchild":
    case "Domestic_Worker":
      if (age > MAX_AGE) {
        return false;
      }
      break;
    case "Parent":
    case "GrandParent":
      if (age > MAX_GRANDPARENT_AGE) {
        return false;
      }
      break;
  }

  return true;
}

function toggleRelationshipSelect(value){
  const rel       = document.getElementById("person_rel");
  let grandParent = document.getElementById("def_grandparent");

  let title = document.getElementById("p_input_title");

  if(value == "ExtendedFamily"){
    title.innerText = "Extended Family";

    showExtendedFamily();
    hideCloseFamily();

    grandParent.classList.remove("d-block");
    grandParent.classList.add("d-none");
    rel.value    = "";
    rel.disabled = false;
  }
  else if(value == "GrandParent"){
    title.innerText = "Grandparents";

    hideExtendedFamily();
    hideCloseFamily();

    grandParent.classList.add("d-block");
    grandParent.classList.remove("d-none");
    rel.value    = "GrandParent";
    rel.disabled = true;
  }
  else if(value == "Dependants"){
    title.innerText = "Dependants";
    
    showCloseFamily();
    hideExtendedFamily();

    grandParent.classList.remove("d-block");
    grandParent.classList.add("d-none");
    rel.value    = "";
    rel.disabled = false;
  }
}

function showExtendedFamily() {
  let extendedBS = document.getElementById("extended_bs");
  let extendedUA = document.getElementById("extended_ua");
  let extendedNN = document.getElementById("extended_nn");
  let extendedGC = document.getElementById("extended_gc");
  let extendedDW = document.getElementById("extended_dw");

  extendedBS.classList.remove("d-none");
  extendedUA.classList.remove("d-none");
  extendedNN.classList.remove("d-none");
  extendedGC.classList.remove("d-none");
  extendedDW.classList.remove("d-none");

  extendedBS.classList.add("d-block");
  extendedUA.classList.add("d-block");
  extendedNN.classList.add("d-block");
  extendedGC.classList.add("d-block");
  extendedDW.classList.add("d-block");
}

function hideExtendedFamily() {
  let extendedBS = document.getElementById("extended_bs");
  let extendedUA = document.getElementById("extended_ua");
  let extendedNN = document.getElementById("extended_nn");
  let extendedGC = document.getElementById("extended_gc");
  let extendedDW = document.getElementById("extended_dw");

  extendedBS.classList.add("d-none");
  extendedUA.classList.add("d-none");
  extendedNN.classList.add("d-none");
  extendedGC.classList.add("d-none");
  extendedDW.classList.add("d-none");

  extendedBS.classList.remove("d-block");
  extendedUA.classList.remove("d-block");
  extendedNN.classList.remove("d-block");
  extendedGC.classList.remove("d-block");
  extendedDW.classList.remove("d-block");
}

function hideCloseFamily() {
  let child   = document.getElementById("dep_child");
  let spouse  = document.getElementById("dep_spouse");
  let aSpouse = document.getElementById("dep_a_spouse");
  let inlaw   = document.getElementById("dep_inlaw");
  let parent  = document.getElementById("dep_parent");

  child.classList.add("d-none");
  spouse.classList.add("d-none");
  aSpouse.classList.add("d-none");
  inlaw.classList.add("d-none");
  parent.classList.add("d-none");

  child.classList.remove("d-block");
  spouse.classList.remove("d-block");
  aSpouse.classList.remove("d-block");
  inlaw.classList.remove("d-block");
  parent.classList.remove("d-block");
}

function showCloseFamily() {
  let child   = document.getElementById("dep_child");
  let spouse  = document.getElementById("dep_spouse");
  let aSpouse = document.getElementById("dep_a_spouse");
  let inlaw   = document.getElementById("dep_inlaw");
  let parent  = document.getElementById("dep_parent");

  child.classList.add("d-block");
  spouse.classList.add("d-block");
  aSpouse.classList.add("d-block");
  inlaw.classList.add("d-block");
  parent.classList.add("d-block");

  child.classList.remove("d-none");
  spouse.classList.remove("d-none");
  aSpouse.classList.remove("d-none");
  inlaw.classList.remove("d-none");
  parent.classList.remove("d-none");
}

function getCoverType() {
  if(COVER_TYPE == "MEMBER") {
    return `${COVER_TYPE} ONLY COVER`;
  }
  else if(COVER_TYPE == "FAMILY"){
    return `${COVER_TYPE} COVER`;
  }
}