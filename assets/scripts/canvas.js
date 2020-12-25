// Canvas setup
canvas = document.querySelector('canvas');
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;
canvas.style.backgroundColor = '#ffffff';

let ctx = canvas.getContext('2d');



// ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
// ctx.fillRect(300, 300, 100, 100);
// ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
// ctx.fillRect(400, 200, 100, 100);

// // Line
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = '#f3a3a3';
// ctx.stroke();

// for (let i = 0; i < 100; i++) {
//   x = canvas.width * Math.random();
//   y = canvas.height * Math.random();
//   r = 255 * Math.random();
//   g = 255 * Math.random();
//   b = 255 * Math.random();
//   // Arc/Circle
//   ctx.beginPath();
//   ctx.lineWidth = 5;
//   ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//   ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 1)`;
//   ctx.stroke();
// }
let mouse = {
  x: undefined,
  y: undefined
}

let maxRadius = 40;
// let minRadius = 2;

let colourArray = [
  '#445CA6',
  '#38A654',
  '#F29F05',
  '#F28705',
  '#F24405'
];

canvas.parentElement.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', () => {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  init();
});

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
    // ctx.lineWidth = 3;
    // ctx.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, 0.3)`;
    // ctx.strokeStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, 0.3)`;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = colourArray[this.colour];
    // ctx.stroke();
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

let circleArray = [];

function init() {
  circleArray = [];

  for (let i = 0; i < 500; i++) {
    let radius = 3 * Math.random() + 1;
    let x = (canvas.width - radius * 2) * Math.random() + radius;
    let y = (canvas.height - radius * 2) * Math.random() + radius;
    let dx = (Math.random() - 0.5);
    let dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, radius, dx, dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  // ctx.beginPath();
  // ctx.lineWidth = 3;
  // ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2, false);
  // ctx.stroke();
}

init();
animate();