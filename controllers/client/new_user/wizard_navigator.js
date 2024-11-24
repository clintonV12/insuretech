let currentSlide = 1;
window.currentSlide = currentSlide;

function doSlideNavigation(newSlide, currentSlide) {
    if(newSlide < currentSlide) {
        window.currentSlide = newSlide;
        goToStepN(newSlide);
    }
    else if(newSlide > currentSlide) {
        //do validation before proceeding
        switch(newSlide) {
            case 2:
                let result = newUserForm1Validator();
                if(result){
                    window.currentSlide = newSlide;
                    goToStepN(newSlide);
                }
                break;
            case 3:
                if(hasConfirmedCover){
                    window.currentSlide = newSlide;
                    goToStepN(newSlide);
                } else {
                    showErrorMsg("Confirmation Error", "Please select cover type and confirm premium selection to proceed.");
                }
                break;
            case 4:
                if (beneficiaries.length >= 1) {
                    window.currentSlide = newSlide;
                    goToStepN(newSlide);
                } else {
                    showWarningMsg("No Beneficiary", "Please add atleast one beneficiary.");
                }
                break;
            case 5:
                window.currentSlide = newSlide;
                goToStepN(newSlide);
                break;
        }
    }
}

function goToStepN(stepNum) {
    let step = `step${stepNum}`;
    //go to next step on wizard
    const activeStep = getActiveStep(document.getElementById(step));
    setActiveStep(activeStep);
    setActivePanel(activeStep);
}

function setNavWizardEvents() {
    const barStep1Btn = document.getElementById("step1");
    const barStep2Btn = document.getElementById("step2");
    const barStep3Btn = document.getElementById("step3");
    const barStep4Btn = document.getElementById("step4");
    const barStep5Btn = document.getElementById("step5");

    const slide1NextBtn = document.getElementById("next_btn1");
    const slide2NextBtn = document.getElementById("next_btn2");
    const slide3NextBtn = document.getElementById("next_btn3");
    const slide4NextBtn = document.getElementById("next_btn4");

    const slide2PrevBtn = document.getElementById("prev_btn2");
    const slide3PrevBtn = document.getElementById("prev_btn3");
    const slide4PrevBtn = document.getElementById("prev_btn4");
    const slide5PrevBtn = document.getElementById("prev_btn5");

    slide2PrevBtn.addEventListener('click', (event) => {
        let newSlide = 1;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    slide3PrevBtn.addEventListener('click', (event) => {
        let newSlide = 2;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    slide4PrevBtn.addEventListener('click', (event) => {
        let newSlide = 3;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    slide5PrevBtn.addEventListener('click', (event) => {
        let newSlide = 4;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    slide1NextBtn.addEventListener('click', (event) => {
        let newSlide = 2;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    slide2NextBtn.addEventListener('click', (event) => {
        let newSlide = 3;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    slide3NextBtn.addEventListener('click', (event) => {
        let newSlide = 4;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    slide4NextBtn.addEventListener('click', (event) => {
        let newSlide = 5;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    barStep1Btn.addEventListener('click', (event) => {
        let newSlide = 1;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    barStep2Btn.addEventListener('click', (event) => {
        let newSlide = 2;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    barStep3Btn.addEventListener('click', (event) => {
        let newSlide = 3;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    barStep4Btn.addEventListener('click', (event) => {
        let newSlide = 4;
        doSlideNavigation(newSlide, window.currentSlide);
    });

    barStep5Btn.addEventListener('click', (event) => {
        let newSlide = 5;
        doSlideNavigation(newSlide, window.currentSlide);
    });
}