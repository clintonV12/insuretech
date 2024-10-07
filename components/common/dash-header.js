export function DashHeader(page) {
    return `
      <nav class="bg-light navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky" id="navbarBlur" data-scroll="true">
        <div class="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">InsureTech</a></li>
              <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Web App</li>
            </ol>
            <h6 class="font-weight-bolder mb-0">${page}</h6>
          </nav>
          
          <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div class="ms-md-auto pe-md-3 d-flex align-items-center">
            <!--Used as placeholder to make sure burger menu moves to end -->
            </div>
            <ul class="navbar-nav  justify-content-end">
              
              <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                <a href="#" class="nav-link text-body p-0" id="iconNavbarSidenav" onclick="">
                  <div class="sidenav-toggler-inner">
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
}