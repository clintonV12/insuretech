const SERVER_URL   = "http://localhost/insuretech-api/index.php/";
const BASE_URL     = "http://localhost/insuretech/";
let pagename       = 'home'; // Default to 'home' page
let USER_PHONE     = null;
let TOKEN          = null;
let KYC_CONSENT    = false;
let AGENT_USERNAME = null;
let AGENT_ID       = null;
let USER_TYPE      = null; //AGENT or CLIENT

function initGlobalVars() {
	pagename       = 'home'; // Default to 'home' page
	USER_PHONE     = null;
	TOKEN          = null;
	KYC_CONSENT    = false;
	AGENT_USERNAME = null;
	AGENT_ID       = null;
	USER_TYPE      = null; //AGENT or CLIENT	
}