export function ClaimAjax() {
  $("#submit_claim").on("click", (function(e) {
    e.preventDefault();
    if (checkIdFileSelected() && checkCertiicateFileSelected() && checkIfVerificationBtn()) {
      let myForm = document.getElementById("claim-form");

      var req = $.ajax({
        "url": SERVER_URL + "claim",
        "method": "POST",
        "data": new FormData(myForm),
        contentType: false,
        processData:false,
        cache:false
        });

      req.done(function(data){
          if(data.status == false) {
            showErrorMsg("Error", data.message);
          }
          else if(data.status == true) {
            showSuccessMsg("Well Done", data.message);
            myForm.reset();
          }
        });

      req.fail(function(jqXHR, textStatus, errorThrown){
          console.log(jqXHR);
          showErrorMsg("Error", textStatus.toString());
        });
    }
  }))
}

function checkIfVerificationBtn() {
  let confirmBtn = document.getElementById("confirm-btn").checked;

  if(!confirmBtn) {
    showErrorMsg("Error", "Please check the confirm button to continue");
    return false;
  } else {
    return true;
  }
}

function checkIdFileSelected() {
  let file1 = document.getElementById("id-doc");

  if(file1.files.length == 0) {
    showErrorMsg("Error", "Please select or capture image of national id.");
    return false;
  } else {
    return true;
  }
}

function checkCertiicateFileSelected() {
  let file1 = document.getElementById("certificate");

  if(file1.files.length == 0) {
    showErrorMsg("Error", "Please select or capture image of death certificate.");
    return false;
  } else {
    return true;
  }
}
