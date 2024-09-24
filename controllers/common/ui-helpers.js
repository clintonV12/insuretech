function showSpinner() {
	var loader = document.getElementById("spinner");
  loader.innerHTML = `
    <div class="spinner-border bg-dark text-info" role="status">
      <span class="sr-only">...</span>
    </div>
  `;
}

function hideSpinner() {
	var loader = document.getElementById("spinner");
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

function showCustomSwal(e){
  if("basic"==e){
    Swal.fire("Any fool can use a computer");
  }
  else if("title-and-text"==e){
    Swal.mixin({
      customClass:{confirmButton:"btn bg-gradient-success",cancelButton:"btn bg-gradient-danger"}
    })
    .fire({
      title:"Sweet!",
      text:"Modal with a custom image.",
      imageUrl:"https://unsplash.it/400/200",
      imageWidth:400,
      imageAlt:"Custom image"
    });
  }
  else if("success-message"==e){
    Swal.fire("Good job!","Registration process started","success");

  }
  else if("warning-message-and-confirmation"==e){
    const t = Swal.mixin({
      customClass:{confirmButton:"btn bg-gradient-success",cancelButton:"btn bg-gradient-danger"},
      buttonsStyling:!1
    });

    t.fire({
        title:"Are you sure?",
        text:"You won't be able to revert this!",
        type:"warning",
        showCancelButton:!0,
        confirmButtonText:"Yes, delete it!",
        cancelButtonText:"No, cancel!",
        reverseButtons:!0
      })
      .then(e => {
        e.value?t.fire("Deleted!","Your file has been deleted.","success"):e.dismiss===Swal.DismissReason.cancel&&t.fire("Cancelled","Your imaginary file is safe :)","error")
      })
  }
  else if("warning-message-and-cancel"==e){
    Swal.mixin({
      customClass:{confirmButton:"btn bg-gradient-success",cancelButton:"btn bg-gradient-danger"},
      buttonsStyling:!1
    })
    .fire({
        title:"Are you sure?",
        text:"You won't be able to revert this!",
        icon:"warning",
        showCancelButton:!0,
        confirmButtonText:"Yes, delete it!"
      })
      .then(e => {
        e.isConfirmed && Swal.fire("Deleted!","Your file has been deleted.","success")
      });
  }
}