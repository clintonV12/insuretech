// Get the app element and inject the HTML
dynamicElement = document.getElementById("main-form");

//global variable to keep track which page is opened
var currentPage = "index";
setCurrentPage(currentPage);

function getBodyScript(page) {
	let bdScript = "";
		switch (page) {
			case 'index':
			case 'home':
				bdScript = "components/home.js";
				break;
			case 'user-info-1':
				bdScript = "components/user-info1.js";
				break;
			case 'login':
				bdScript = "components/login.js";
				break;
			default:
				console.error("Unsupported page:", page);
				return; // Exit function if page is unsupported
		}
	return bdScript;
}

function createAndAppendScript(id, scriptSource){
	// Remove existing script element if any
	const existingScript = document.getElementById(id);
	if (existingScript) {
		existingScript.remove();
	}

	// Create new script element
	const script = document.createElement("script");
	script.src = scriptSource;
	script.async = true;
	script.id = id;

	// Append script element to the document body
	document.body.appendChild(script);
}

function setCurrentPage(page){
	currentPage = page;
	dynamicElement.innerHTML = ``;
  createAndAppendScript(2, getBodyScript(currentPage));
  console.log(currentPage);
}