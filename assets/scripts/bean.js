const bean = document.querySelectorAll("#bean path");

for (let i = 0; i < bean.length; i++) {
  // console.log(`Letter ${i} is ${bean[i].getTotalLength()}`);
  bean[i].style.strokeDasharray = bean[i].getTotalLength();
  // bean[i].style.fill = "transparent";
  bean[i].setAttribute("stroke", bean[i].getAttribute("fill"));
  // bean[i].setAttribute("stroke-width", thiccInput.value);
}

var draw = anime({
  targets: bean,
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutQuad',
  duration: 3000,
  direction: 'linear',
  autoplay: true,
  loop: false,
  complete: () => {
    console.log("Draw lines complete");
    filler.play();
  }
});

var filler = anime({
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