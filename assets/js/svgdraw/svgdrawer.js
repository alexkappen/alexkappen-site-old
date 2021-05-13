function prepareSVG(svg) {
  // svg is a NodeList of svg paths
  svg.forEach(prepareSVGPath)
}

// Sets appropriate attributes on svg
function prepareSVGPath(path) {
  path.style.strokeDasharray = path.getTotalLength();
  path.setAttribute("stroke", path.getAttribute("fill"));
  path.setAttribute("stroke-width", 1);
}

// Returns anime.js object
function drawSVGClosure(svg, fillerFunc) {
  let drawer = anime({
    targets: svg,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutQuad',
    duration: 3000,
    direction: 'linear',
    autoplay: false,
    loop: false,
    complete: () => {
      console.log("SVG lines drawn");
      fillerFunc.play();
    }
  });
  return drawer;
}

// Returns anime.js object
function fillSVGClosure(svg) {
  let filler = anime({
    targets: svg,
    fill: ["rgba(0, 0, 0, 0)", (el, i) => {
      return svg[i].getAttribute("fill");
    }],
    easing: "easeInSine",
    delay: 500,
    duration: 1500,
    direction: 'linear',
    loop: false,
    autoplay: false,
    complete: () => {
      console.log("SVG filled");
    }
  });
  return filler;
}

// SnowGlobe
const snowGlobe = document.querySelectorAll("#snowglobe path");

prepareSVG(snowGlobe);

const fillSnowGlobe = fillSVGClosure(snowGlobe);
const drawSnowGlobe = drawSVGClosure(snowGlobe, fillSnowGlobe);

window.addEventListener("load", () => {
  drawSnowGlobe.play();
});


// var filler = anime({
//   targets: svgDrawing,
//   fill: ["rgba(0,0,0,0)", function(el, i) {
//     return svgDrawing[i].getAttribute("fill");
//   }],
//   easing: "easeInSine",
//   delay: 500,
//   duration: 1500,
//   direction: 'linear',
//   loop: false,
//   autoplay: false,
//   complete: () => {
//     console.log("Filler complete");
//   }
// });