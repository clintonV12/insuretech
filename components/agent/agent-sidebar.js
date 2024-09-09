export function AgentSideBar() {
    return `
    <aside class="bg-light sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3" id="sidenav-main">
      <div class="sidenav-header">
        <i class="bx bx-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <a class="navbar-brand m-0" href="#">
          <img src="assets/img/logos/security.png" class="navbar-brand-img h-100" alt="main_logo">
          <span class="ms-1 font-weight-bold">InsureTech</span>
        </a>
      </div>
      <hr class="horizontal dark mt-0">
      <div class="collapse navbar-collapse  w-auto  max-height-vh-50 h-50" id="sidenav-collapse-main">

        <ul class="navbar-nav">

          <li class="nav-item">
            <a class="nav-link nav-page" href="#" id="agent-dashboard">
              <i class="bx bx-home"></i>
              <span class="nav-link-text ms-1">Dashboard</span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link nav-page " href="#" id="onboarding">
              <i class="bx bx-user-plus"></i>
              <span class="nav-link-text ms-1">Client Onboarding</span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link nav-page " href="#" id="login">
              <i class="bx bx-exit"></i>
              <span class="nav-link-text ms-1">Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="sidenav-footer mx-3 ">
        <div class="card card-background shadow-none card-background-mask-info" id="sidenavCard">
          <div class="full-background" style="background-image: url('assets/img/curved-images/white-curved.jpeg')"></div>
          <div class="card-body text-start p-3 w-100">
            <div class="icon icon-shape icon-sm bg-white shadow text-center mb-3 d-flex align-items-center justify-content-center border-radius-md">
              <i class="bx bx-phone text-dark text-gradient text-lg top-0" aria-hidden="true" id="sidenavCardIcon"></i>
            </div>
            <div class="docs-info">
              <h6 class="text-white up mb-0">Need help?</h6>
              <p class="text-xs font-weight-bold">Talk to our support team</p>
              <a href="#" class="btn btn-white btn-sm w-100 mb-0">Support</a>
            </div>
          </div>
        </div>

      </div>
    </aside>
    `;
}