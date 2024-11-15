function showSpinner() {
	var loader = document.getElementById("spinner");
  loader.innerHTML = `
    <div class="spinner-border bg-dark text-info" role="status">
      <span class="sr-only"></span>
    </div>
  `;
}

function hideSpinner() {
  var loader = document.getElementById("spinner");
  loader.innerHTML = ``;
}

function showLoadingBtn(msg) {
  var loader = document.getElementById("spinner-btn");
  loader.innerHTML = `
    <button class="btn btn-info btn-sm mb-2 text-white" type="button" disabled>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      ${msg}...
    </button>
  `;
}

function hideLoadingBtn() {
  var loader = document.getElementById("spinner-btn");
  loader.innerHTML = ``;
}

//"success","warning","info","question","error"
function showErrorMsg(title, msg) {
  Swal.fire(title, msg,"error");
}

function showWarningMsg(title, msg) {
  Swal.fire(title, msg,"warning");
}

function showSuccessMsg(title, msg) {
  Swal.fire(title, msg,"success");
}

function showInfoMsg(title, msg) {
  Swal.fire(title, msg,"info");
}

function chooseCoverType(cover_type) {
  COVER_TYPE = cover_type;

  if(COVER_TYPE == "MEMBER") {
    document.getElementById("coverType").innerText = `${COVER_TYPE} ONLY COVER`;
  }
  else if(COVER_TYPE == "FAMILY"){
    document.getElementById("coverType").innerText = `${COVER_TYPE} COVER`;
  }

  const familyPlan = document.getElementById("family_plan");
  const coverBtns  = document.getElementById("cover-btns");
  const undoBtn    = document.getElementById("undo_btn");
  const coverSlide = document.getElementById('cover_slide');

  familyPlan.classList.toggle("d-none");
  coverBtns.classList.toggle("d-none");

  coverSlide.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      if (coverBtns.classList.contains("d-none")) { 
        undoBtn.classList.remove("d-none");
      } else {
        undoBtn.classList.add("d-none");
      }
  });

  const confirmPlan = document.getElementById('confirm-plan');
  confirmPlan.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior

      if(COVER_TYPE == "MEMBER") {
        //go to next step on wizard
        const activeStep = getActiveStep(document.getElementById('step3'));
        setActiveStep(activeStep);
        setActivePanel(activeStep);
      }
      else if (COVER_TYPE === "FAMILY") {
        const extended = document.getElementById("extended-cover");
        const familyPlan = document.getElementById("family_plan");
        const coverPeopleList = document.getElementById("c-list");

        // Check if 'extended-cover' is currently hidden
        const isHidden = extended.classList.contains("d-none");

        if (isHidden) {
          extended.classList.toggle("d-none");
          coverPeopleList.classList.toggle("d-none");
          familyPlan.classList.add("d-none");
        }
      }
  });
}

function undoChooseCover() {
  const familyPlan = document.getElementById("family_plan");
  familyPlan.classList.add("d-none");

  const coverBtns = document.getElementById("cover-btns");
  coverBtns.classList.remove("d-none");

  const coverPeopleList = document.getElementById("c-list");
  coverPeopleList.classList.add("d-none");

  const extended = document.getElementById("extended-cover");
  extended.classList.add("d-none");

  //reset slider information
  document.getElementById("currentRange").innerText = "";
  document.getElementById("max-people").innerText = "";
}

function setDefaultRelationship(rel_value) {
  //used in modal
  const rel     = document.getElementById("person_rel");

  let opt = document.createElement('option');
  opt.value = "Parent_GrandParent";

  if (typeof opt.textContent === 'undefined') {
    opt.innerText = "Parent / Grandparent";
  } else {
    opt.textContent = "Parent / Grandparent";
  }
  
  rel.appendChild(opt);
  rel.value     = rel_value;
  rel.disabled  = true;
}

function resetDefaultRelationship() {
  const rel    = document.getElementById("person_rel");
  rel.remove(4);//index of Parent_GrandParent option
  rel.value    = "";
  rel.disabled = false;
}