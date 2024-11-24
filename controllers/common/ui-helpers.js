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