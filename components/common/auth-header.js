export function AuthHeader() {
	return `
		<div class="container position-sticky z-index-sticky top-0">
		    <div class="row">
		      <div class="col-12">
		        <!-- Navbar -->
		        <nav class="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
		          <div class="container-fluid">
		            <a class="navbar-brand font-weight-bolder ms-lg-0 ms-3 nav-page" id="welcome" href="#">
		              Insuretech
		            </a>
		            <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
		              <span class="navbar-toggler-icon mt-2">
		                <span class="navbar-toggler-bar bar1"></span>
		                <span class="navbar-toggler-bar bar2"></span>
		                <span class="navbar-toggler-bar bar3"></span>
		              </span>
		            </button>
		            <div class="collapse navbar-collapse" id="navigation">
		              <ul class="navbar-nav mx-auto">
		                <li class="nav-item">
		                  <a class="nav-link d-flex align-items-center me-2 active nav-page" href="#" id="welcome">
		                    Home
		                  </a>
		                </li>
		                <li class="nav-item">
		                  <a class="nav-link me-2 nav-page" href="#" id="signup">
		                    Sign Up
		                  </a>
		                </li>
		                <li class="nav-item">
		                  <a class="nav-link me-2 nav-page" href="#" id="login">
		                    Sign In
		                  </a>
		                </li>
		                <li class="nav-item">
		                  <a class="nav-link me-2 nav-page" href="#" id="price">
		                    Pricing
		                  </a>
		                </li>
		                <li class="nav-item">
		                  <a class="nav-link me-2 nav-page" href="#" id="claim">
		                    Submit a claim
		                  </a>
		                </li>
		              </ul>
		              <ul class="navbar-nav d-lg-block d-none">
		                <li class="nav-item">
		                  <a href="#" class="btn btn-sm btn-round mb-0 me-1 bg-gradient-dark">Get a Quote</a>
		                </li>
		              </ul>
		            </div>
		          </div>
		        </nav>
		        <!-- End Navbar -->
		      </div>
		    </div>
		</div> `;
}