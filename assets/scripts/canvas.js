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

class Circle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.dx = dx;
    this.dy = dy;
    this.red = 255 * Math.random();
    this.green = 255 * Math.random();
    this.blue = 255 * Math.random();
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, 0.3)`;
    ctx.strokeStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, 0.3)`;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fill();
  }

  update() {
    if (this.x + this.r >= canvas.width || this.x - this.r <= 0) {
      this.dx *= -1;
    }
    if (this.y + this.r >= canvas.height || this.y - this.r <= 0) {
      this.dy *= -1;
    }
  
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

let circleArray = [];

for (let i = 0; i < 100; i++) {
  let radius = 30;
  let x = (canvas.width - radius * 2) * Math.random() + radius;
  let y = (canvas.height - radius * 2) * Math.random() + radius;
  let dx = (Math.random() - 0.5);
  let dy = (Math.random() - 0.5);
  circleArray.push(new Circle(x, y, radius, dx, dy));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();