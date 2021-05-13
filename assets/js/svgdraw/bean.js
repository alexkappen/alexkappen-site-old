// Mr Bean Demo
const demoControls = document.querySelector(".canvas-controls");

const bean = document.querySelectorAll("#bean path");

prepareSVG(bean);

const beanFiller = fillSVGClosure(bean);
const beanDraw = drawSVGClosure(bean, beanFiller);

const beanBtn = document.querySelector("#beans").addEventListener("click", () => {
  demoControls.scrollIntoView();
  beanFiller.restart();
  beanFiller.pause();
  beanDraw.play();
});