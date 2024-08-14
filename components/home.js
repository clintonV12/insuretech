content = `
<div class="card card-bg shadow hero-header-form">
  <div class="card-body p-4 p-xl-6">
    <h2 class="text-100 text-center">Sign Up</h2>
    <form class="mb-3">
      
      <div class="form-floating mb-3">
        <input class="form-control input-box form-ensurance-header-control" id="floatingPhone" type="tel" placeholder="+268" />
        <label for="floatingPhone">Phone</label>
      </div>

      <div class="form-floating mb-3">
        <input class="form-check-input" id="consent" type="checkbox" />
        <b>I consent to use my momo info.</b>
      </div>

      <div class="form-floating mb-3">
        <input class="form-check-input" id="terms" type="checkbox" />
        <b>I agree to the <a href="">terms and conditions</a>.</b>
      </div>

      <div class="col-12 d-grid">
        <button class="btn btn-primary rounded-pill" type="button" onclick="setCurrentPage('user-info-1')">Continue</button>
      </div>
    </form>
  </div>
</div>
`;

dynamicElement.innerHTML = content;
