let maxRadius = 40;
let colourArray = [
  '#445CA6',
  '#38A654',
  '#F29F05',
  '#F28705',
  '#F24405'
];

class Circle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.dx = dx;
    this.dy = dy;
    this.colour = Math.floor(Math.random() * colourArray.length);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = colourArray[this.colour];
    ctx.fill();
  }

  update() {
    // Boundary Bounce
    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.dx *= -1;
    }
    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
      this.dy *= -1;
    }
  
    // Animates movement
    this.x += this.dx;
    this.y += this.dy;

    // Interactivity
    if ((mouse.x - this.x) < 50 && (mouse.x - this.x) > -50 
    && (mouse.y - this.y) < 50 && (mouse.y - this.y) > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

let bubbleArray = [];

function bubbleInit() {
  bubbleArray = [];

  for (let i = 0; i < 500; i++) {
    let radius = 3 * Math.random() + 1;
    let x = (canvas.width - radius * 2) * Math.random() + radius;
    let y = (canvas.height - radius * 2) * Math.random() + radius;
    let dx = (Math.random() - 0.5);
    let dy = (Math.random() - 0.5);
    bubbleArray.push(new Circle(x, y, radius, dx, dy));
  }
}

function bubbleAnimate() {
  globalID = requestAnimationFrame(bubbleAnimate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < bubbleArray.length; i++) {
    bubbleArray[i].update();
  }
}

// Controls
const bubbleCanvas = document.querySelector('#bubbles').addEventListener('click', () => {
  stop(globalID);
  start(bubbleInit, bubbleAnimate);
  currentInit = bubbleInit;
  currentAnim = bubbleAnimate;
});


