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

window.addEventListener('load',setFormHeight,false);
window.addEventListener('resize',setFormHeight,false);

console.log("multistepjs-loaded");