const SERVER_URL   = "http://localhost/api.insuretech/index.php/";
//const SERVER_URL   = "https://api.insuretech.centurionbd.com/index.php/"
const BASE_URL     = "http://localhost/insuretech/";
//const BASE_URL     = "https://clintonv12.github.io/insuretech/";
let pagename       = 'home'; // Default to 'home' page
let USER_PHONE     = null;
let TOKEN          = null;
let KYC_CONSENT    = false;
let AGENT_USERNAME = null;
let AGENT_ID       = null;
let USER_TYPE      = null; //AGENT or CLIENT
let COVER_TYPE     = null; //MEMBER or FAMILY

function initGlobalVars() {
	pagename       = 'home'; // Default to 'home' page
	USER_PHONE     = null;
	TOKEN          = null;
	KYC_CONSENT    = false;
	AGENT_USERNAME = null;
	AGENT_ID       = null;
	USER_TYPE      = null; //AGENT or CLIENT
	COVER_TYPE     = null; //MEMBER or FAMILY
}