content = `
  <div class="card card-bg shadow hero-header-form">
    <div class="card-body p-4 p-xl-6">
      <h2 class="text-100 text-center">User Details</h2>
      <form class="mb-3">
        
        <div class="form-floating mb-3">
          <input class="form-control input-box form-ensurance-header-control" id="f-name" type="text" placeholder="First Name" />
          <label for="f-name">First Name</label>
        </div>

        <div class="form-floating mb-3">
          <input class="form-control input-box form-ensurance-header-control" id="l-name" type="text" placeholder="First Name" />
          <label for="l-name">Last Name</label>
        </div>

        <div class="form-floating mb-3">
          <input class="form-control input-box form-ensurance-header-control" id="national-id" type="number" placeholder="ID" />
          <label for="national-id">National ID</label>
        </div>

        <div class="col-12 d-grid">
          <button class="btn btn-primary rounded-pill" type="button" onclick="setCurrentPage('login')">Continue</button>
        </div>
      </form>
    </div>
  </div> `;

dynamicElement.innerHTML = content;
