const bean = document.querySelectorAll("#bean path");

const beanBtn = document.querySelector('#reveal-svg-draw').addEventListener('click', () => {
  beanFiller.restart();
  beanFiller.pause();
  beanDraw.play();
});

for (let i = 0; i < bean.length; i++) {
  // console.log(`Letter ${i} is ${bean[i].getTotalLength()}`);
  bean[i].style.strokeDasharray = bean[i].getTotalLength();
  // bean[i].style.fill = "transparent";
  bean[i].setAttribute("stroke", bean[i].getAttribute("fill"));
  bean[i].setAttribute("stroke-width", 1);
}

var beanDraw = anime({
  targets: bean,
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutQuad',
  duration: 3000,
  direction: 'linear',
  autoplay: false,
  loop: false,
  complete: () => {
    console.log("Draw lines complete");
    beanFiller.play();
  }
});

var beanFiller = anime({
  targets: bean,
  fill: ["rgba(0,0,0,0)", function(el, i) {
    return bean[i].getAttribute("fill");
  }],
  easing: "easeInSine",
  delay: 500,
  duration: 1500,
  direction: 'linear',
  loop: false,
  autoplay: false,
  complete: () => {
    console.log("Filler complete");
  }
});