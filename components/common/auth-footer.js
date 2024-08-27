export function AuthFooter() {
    return `
        <footer class="footer py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mb-4 mx-auto text-center">
          <a href="javascript:;" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2 nav-page">
            About Us
          </a>
          <a href="javascript:;" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2 nav-page" id="price">
            Pricing
          </a>
          <a href="javascript:;" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2 nav-page" id="agent-login">
            Agent
          </a>
        </div>
      </div>
      <div class="row">
        <div class="col-8 mx-auto text-center mt-1">
          <p class="mb-0 text-secondary">
            Copyright © <script>
              document.write(new Date().getFullYear())
            </script>
          </p>
        </div>
      </div>
    </div>
  </footer>
    `;
}