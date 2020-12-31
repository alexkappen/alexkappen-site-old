const skillDetails = document.querySelector('#skills-details');

// Canvas setup
canvas = document.querySelector('canvas');
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;
canvas.style.backgroundColor = '#ffffff';

let ctx = canvas.getContext('2d');

let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
});

addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init()
});

addEventListener('click', () => {
  // flyball();
  spread = 60;
  pointRise(spread);
  // serpent();
});

// Animation Controls
let globalID;

function start(initialize, animation) {
  canvasRevealBtn();
  initialize();
  animation();
}

function stop(requestID) {
  window.cancelAnimationFrame(requestID);
}

// Canvas Reveal
function canvasRevealBtn() {
  skillDetails.scrollIntoView();
}

