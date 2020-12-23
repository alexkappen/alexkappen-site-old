const svgDrawing = document.querySelectorAll("#svg-drawing path");

for (let i = 0; i < svgDrawing.length; i++) {
  // console.log(`Letter ${i} is ${bean[i].getTotalLength()}`);
  svgDrawing[i].style.strokeDasharray = svgDrawing[i].getTotalLength();
  // bean[i].style.fill = "transparent";
  svgDrawing[i].setAttribute("stroke", svgDrawing[i].getAttribute("fill"));
  // bean[i].setAttribute("stroke-width", thiccInput.value);
}

var draw = anime({
  targets: svgDrawing,
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
  targets: svgDrawing,
  fill: ["rgba(0,0,0,0)", function(el, i) {
    return svgDrawing[i].getAttribute("fill");
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