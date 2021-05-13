// ES6
"use strict";

// Canvas setup
const canvas = document.querySelector(".canvas");
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;
// canvas.style.backgroundColor = "rgba(255, 255, 255, 1)";
const ctx = canvas.getContext("2d");

const canvasWrapper = canvas.parentElement;

// Mouse Vector
let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

// Update Mouse Vector
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
});

// Update animation on window resize
window.addEventListener("resize", () => {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  currentInitFunc();
});

// --- Animation Controls
let globalID = null;
let currentInitFunc = () => {return null;}
let currentClearFunc = () => {return null;}

// Play Animation
function play(clearFunc, initFunc, animateFunc) {
  // Stop current animation
  window.cancelAnimationFrame(globalID);
  // Apply Clear current animation variables
  currentClearFunc();
  // Rebind New Clear Func
  currentClearFunc = clearFunc;
  // CLear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Scroll canvas & controls into view
  demoControls.scrollIntoView();
  // Initialize
  currentInitFunc = initFunc;
  initFunc();
  // Animate
  animateFunc();
}

// --- Bubble Controls
function bubbleClear() {
  bubbleArray = [];
}

const bubbleBtn = document.querySelector("#bubbles").addEventListener("click", () => {
  play(bubbleClear, bubbleInit, bubbleAnimate);
});

// --- Gravity Controls
// Interactivity
function pointRise(spread) {
  ballArray.forEach(ball => {
    let height = -Math.abs(mouse.y - canvas.height);
    let deltaX = Math.abs(ball.x - mouse.x) + spread;
    // console.log('DeltaX: ' + deltaX);
    // ball.dy = Math.max(0, -deltaX + height);
    // ball.y += height;
    let yVel = -Math.sqrt(2 * gravity * Math.abs(height) + 2 * spread)
    // console.log('Y Velocity: ' + yVel);
    let rise = Math.sqrt(deltaX) + yVel;
    // console.log('Rise: ' + rise);
    if (rise <= 0) {
      ball.dy += rise;
    }
  });
}

// Interactivity
canvasWrapper.addEventListener("click", () => {
  if (ballArray.length) {
    console.log("Pointer Down!");
    const spread = 60;
    pointRise(spread);
    // serpent();
    // flyball();
  }
});

// Gravity Animation
function ballAnimate() {
  // Animate canvas
  globalID = requestAnimationFrame(ballAnimate);
  // Clear canvas every frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Update Every Ball
  ballArray.forEach(ball => {
    ball.update();
  });
}

// CLear Gravity Animation
function ballClear() {
  ballArray = [];
}

const gravityBtn = document.querySelector("#gravity").addEventListener("click", () => {
  play(ballClear, ballInit, ballAnimate);
});






