// app.js
import { About } from './components/about.js';
import { Price } from './components/price.js';
import { Welcome } from './components/welcome.js';

import { AuthHeader} from './components/common/auth-header.js';
import { AuthFooter } from './components/common/auth-footer.js';
import { DashHeader } from './components/common/dash-header.js';
import { DashFooter } from './components/common/dash-footer.js';

import { Login } from './components/client/login.js';
import { LoginOTP } from './components/client/login-otp.js';
import { Signup } from './components/client/signup.js';
import { OTP } from './components/client/otp.js';
import { SideBar } from './components/client/sidebar.js';
import { Home } from './components/client/home.js';
import { Bill } from './components/client/billing.js';
import { NewUser } from './components/client/new-user.js';
import { Policy } from './components/client/policy.js';
import { ClaimSideBar } from './components/client/claim-sidebar.js';
import { Claim } from './components/client/claim.js';

import { AgentLogin } from './components/agent/agent-login.js';
import { AgentSideBar } from './components/agent/agent-sidebar.js';
import { AgentDashboard } from './components/agent/agent-dashboard.js';
import { OnBoardNewUser } from './components/agent/agent-onboarding.js';

let pagename  = 'home'; // Default to 'home' page
let pageTitle = 'Home';

function setPageName(page) {
    console.log(page);
    pagename = page;
    setPageTitle();
}

// Function to get the current page name
function getPageName() {
    return pagename;
}

function renderAuthPage(content) {
    document.getElementById('app').innerHTML = `
        ${AuthHeader()}
        <div id="content">${content}</div>
        ${AuthFooter()}
    `;

    // Attach event listeners to the navigation links
    document.querySelectorAll('.nav-page').forEach(link => {
        link.addEventListener('click', (event) => {
            setPageName(event.target.id);
            router();
        });
    });
}

// Function to render the full page
function renderPage(content) {
    let sideBarContent = ``;

    if (pagename == 'claim') {
        sideBarContent = ClaimSideBar();
    } else if(pagename == 'agent-dashboard' || pagename == 'agent-onboarding') {
        sideBarContent = AgentSideBar();
    } else {
        sideBarContent = SideBar()
    }

    document.getElementById('app').innerHTML = `
        <div id="content">
        ${sideBarContent}
        <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        ${DashHeader(pageTitle)}
        <div class="container-fluid py-4">
        ${content}
        ${DashFooter()}
        </div>
        </main>
        </div>
    `;

    // Attach event listeners to the navigation links
    document.querySelectorAll('.nav-page').forEach(link => {
        link.addEventListener('click', (event) => {
            setPageName(event.target.id);
            router();
        });
    });

    
    if (pagename == 'new-user' || pagename == 'agent-onboarding') {
        if (pagename == 'new-user') {
            document.getElementById("policy").classList.add('active');    
        } else {
            document.getElementById(pagename).classList.add('active');
        }
        getMultiStepScript();
    } else {
        document.getElementById(pagename).classList.add('active');
    }
}

function getMultiStepScript() {
    // Remove existing script element if any
    const existingScript = document.getElementById("multistep-script");
    if (existingScript) {
        existingScript.remove();
    }
    
    const script = document.createElement("script");
    script.src = "assets/js/plugins/multistep-form.js";
    script.async = true;
    script.id = "multistep-script";

    // Append script element to the document body
    document.body.appendChild(script);
    
}

// Function to load the correct content based on pagename
async function router() {
    let content = '';

    switch (pagename) {
        case 'login':
        case 'logout':
        case 'home':
            content = await Login();
            break;
        case 'welcome':
            content = await Welcome();
            break;
        case 'signup':
            content = await Signup();
            break;
        case 'login-otp':
            content = await LoginOTP();
            break;
        case 'otp':
            content = await OTP();
            break;
        case 'dashboard':
            content = await Home();
            break;
        case 'billing':
            content = await Bill();
            break;
        case 'new-user':
            content = await NewUser();
            break;
        case 'claim':
            content = await Claim();
            break;
        case 'policy':
            content = await Policy();
            break;
        case 'contact':
            content = await Contact();
            break;
        case 'price':
            content = await Price();
            break;
        case 'agent-login':
            content = await AgentLogin();
            break;
        case 'agent-dashboard':
            content = await AgentDashboard();
            break;
        case 'agent-onboarding':
            content = await OnBoardNewUser();
            break;
        default:
            content = await Login();
    }

    switch (pagename) {
        case 'login':
        case 'logout':
        case 'otp':
        case 'home':
        case 'signup':
        case 'price':
        case 'login-otp':
        case 'welcome':
        case 'agent-login':
            renderAuthPage(content);
            break;
        default:
            renderPage(content);
    }
}

function setPageTitle() {
    switch (pagename) {
        case 'dashboard':
            pageTitle = 'Home'
            break;
        case 'billing':
            pageTitle = 'Billing'
            break;
        case 'new-user':
            pageTitle = 'Policy Registration'
            break;
        case 'claim':
            pageTitle = 'Policy Claim - Guest Account'
            break;
        case 'policy':
            pageTitle = 'Policy Review'
            break;
        case 'agent-dashboard':
        case 'agent-onboarding':
            pageTitle = 'Agent Dashboard'
            break;
        default:
            pageTitle = 'Home';
    }
}

// Attach event listeners to navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Load the correct page on initial load
    const initialPage = getPageName();
    setPageName(initialPage);
    router();
});

