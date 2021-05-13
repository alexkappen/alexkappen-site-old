let priors = [0.1, 0.1, 0.01, 0.2, 0.07, 0.01, 0.01, 0.2, 0.02, 0.12, 0.15, 0.01];
let priorSum = priors.reduce(function (accumVariable, curValue) {
  return accumVariable + curValue
}, 0);
console.log("Sum of priors: " + priorSum);
let locations = ["Left Desk", "Right Desk", "Big Box", "Filing Cabinet 1", "Box 1", "Bag", "Backpack", "Filing Cabinet 2", "Left Shelf", "Right Shelf", "Waste Basket", "Box 2"]
let easeOfDetection = [0.20, 0.20, 0.12, 0.01, 0.12, 0.85, 0.85, 0.01, 0.30, 0.30, 0.85, 0.12];
let maxIts = 9;
let iterations = 0;

let bayesianSearcher;

searcherHTML = document.getElementById("bayesianSearcher");

function setup() {
  let renderer = createCanvas(600, 400);
  renderer.parent(searcherHTML)
  frameRate(2);
  noLoop();
  strokeWeight(2);
  textSize(16);
  textAlign(CENTER, CENTER);

  bayesianSearcher = new BayesianSearcher(priors, easeOfDetection);

  bayesianSearcher.drawUtilityGrid(3, 4);
}

function draw() {
  background(220);

  if (iterations !== 0) {
    bayesianSearcher.search();
  }
  bayesianSearcher.drawUtilityGrid(3, 4);
  updateSearchSequence(bayesianSearcher.searchSequence());

  if (frameCount > maxIts) {
    noLoop();
  }
}

function updateSearchSequence(searchSequence) {
  let searchSequenceOL = document.querySelector(".searchSequence");
  let li = document.createElement("LI");
  let text = document.createTextNode(searchSequence.slice(-1));
  li.appendChild(text);
  searchSequenceOL.appendChild(li);
}

let startLoopBtn = document.querySelector(".startLoop");
startLoopBtn.onclick = function () {
  frameCount = 1;
  if (iterations == 1) {
    maxIts += 1;
  }
  iterations += 1;
  loop();
}

let oneLoopBtn = document.querySelector(".oneLoop");
oneLoopBtn.onclick = function () {
  iterations += 1;
  draw();
}