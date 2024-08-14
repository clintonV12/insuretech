content = `
  <div class="card card-bg shadow hero-header-form">
    <div class="card-body p-4 p-xl-6">
      <h2 class="text-100 text-center">Login</h2>
      <form class="mb-3">
        
        <div class="form-floating mb-3">
          <input class="form-control input-box form-ensurance-header-control" id="floatingPhone" type="tel" placeholder="+268" />
          <label for="floatingPhone">Phone</label>
        </div><br>

        <div class="col-12 d-grid">
          <button class="btn btn-primary rounded-pill" type="button" onclick="setCurrentPage('login')">Reqoest OTP</button>
        </div>
      </form>
    </div>
  </div> `;

dynamicElement.innerHTML = content;
