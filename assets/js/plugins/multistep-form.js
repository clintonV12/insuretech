DOMstrings = {
  stepsBtnClass:'multisteps-form__progress-btn',
  stepsBtns:document.querySelectorAll(`.multisteps-form__progress-btn`),
  stepsBar:document.querySelector('.multisteps-form__progress'),
  stepsForm:document.querySelector('.multisteps-form__form'),
  stepsFormTextareas:document.querySelectorAll('.multisteps-form__textarea'),
  stepFormPanelClass:'multisteps-form__panel',
  stepFormPanels:document.querySelectorAll('.multisteps-form__panel'),
  stepPrevBtnClass:'js-btn-prev',
  stepNextBtnClass:'js-btn-next'
};

removeClasses = (elemSet,className) => {
  elemSet.forEach(elem => {elem.classList.remove(className);});
};

findParent = (elem,parentClass) => {
  let currentNode = elem;
  while(!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }
  return currentNode;
};

getActiveStep = elem => {
  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

setActiveStep = activeStepNum => {
  removeClasses(DOMstrings.stepsBtns,'js-active');
  DOMstrings.stepsBtns.forEach((elem,index) => {
    if(index <= activeStepNum){elem.classList.add('js-active');}
  });
};

getActivePanel = () => {
  let activePanel;
  DOMstrings.stepFormPanels.forEach( elem=> {
    if(elem.classList.contains('js-active')){
      activePanel = elem;}
    });

  return activePanel;
};

setActivePanel = activePanelNum => {
  removeClasses(DOMstrings.stepFormPanels,'js-active');
  DOMstrings.stepFormPanels.forEach((elem,index) => {
    if(index === activePanelNum){
      elem.classList.add('js-active');setFormHeight(elem);
    }
  });
};

formHeight = activePanel => {
  const activePanelHeight = activePanel.offsetHeight;
  DOMstrings.stepsForm.style.height =`${activePanelHeight}px`;
};

setFormHeight = () => {
  const activePanel = getActivePanel();
  formHeight(activePanel);
};

DOMstrings.stepsBar.addEventListener('click', e => {
  const eventTarget = e.target;
  if(!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
    return;
  }

  if (eventTarget.id == "step2") {
  	if (!newUserForm1Valid()) {return;}
  }
  else if (eventTarget.id == "step3") {
  	
  }
  else if (eventTarget.id == "step4") {
    
  }
  else if (eventTarget.id == "step5") {
  	
  }
  else if (eventTarget.id == "step6") {
  	if (!newUserForm4Valid()) {return;}
  }

  const activeStep = getActiveStep(eventTarget);
  setActiveStep(activeStep);
  setActivePanel(activeStep);
  
});

DOMstrings.stepsForm.addEventListener('click', e => {
  const eventTarget = e.target;
  if(!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)
    ||eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)))
  {return;}

  //defined in controllers/common/validation.js
  if (eventTarget.id == "next_btn1") {
  	if (!newUserForm1Valid()) {return;}
  }
  else if (eventTarget.id == "next_btn2") {
  	
  }
  else if (eventTarget.id == "next_btn3") {
  	
  }
  else if (eventTarget.id == "next_btn4") {
  	if (!newUserForm4Valid()) {return;}
  }

  const activePanel = findParent(eventTarget,`${DOMstrings.stepFormPanelClass}`);
  let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);
  if(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)){
    activePanelNum--;
  } else {
    activePanelNum++;
  }

  setActiveStep(activePanelNum);
  setActivePanel(activePanelNum);
});

window.addEventListener('load',setFormHeight,false);
window.addEventListener('resize',setFormHeight,false);

console.log("multistepjs-loaded");