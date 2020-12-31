/* Based off code from Chris Course video: 
 * https://www.youtube.com/watch?v=3b7FyIxWW94&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=5
 */

const colours = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
const gravity = 1;
const friction = 0.70;

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, colour) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.colour = colour;
    this.gravity = gravity;
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.stroke()
    ctx.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.gravity = 1;
      this.dy = -this.dy * friction;
    } else {
      this.dy += this.gravity;
    }
    if (this.y - this.radius + this.dy < 0) {
      this.dy *= -0.05;
      this.gravity = 0.02;
    }
    if (this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx;
    }
    this.y += this.dy;
    this.x += this.dx;
    this.draw();
  }
}

// Interactivity
function pointRise(spread) {
  ballArray.forEach(ball => {
    height = -Math.abs(mouse.y - window.innerHeight);
    deltaX = Math.abs(ball.x - mouse.x) + spread;
    // console.log('DeltaX: ' + deltaX);
    // ball.dy = Math.max(0, -deltaX + height);
    // ball.y += height;
    yVel = -Math.sqrt(2 * gravity * Math.abs(height) + 2 * spread)
    // console.log('Y Velocity: ' + yVel);
    rise = Math.sqrt(deltaX) + yVel;
    // console.log('Rise: ' + rise);
    if (rise <= 0) {
      ball.dy += rise;
    }
  });
}

// Implementation
let ballArray = [];

function ballInit() {
  ballArray = [];

  for (let i = 0; i < 200; i++) {
    let radius = randomIntFromRange(8, 20);
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    let dx = randomIntFromRange(-2, 2);
    let dy = randomIntFromRange(-2, 2);
    let colour = randomColour(colours)
    ballArray.push(new Ball(x, y, dx, dy, radius, colour));
  }
}

// Animation Loop
function ballAnimate() {
  globalID = requestAnimationFrame(ballAnimate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ballArray.forEach(ball => {
    ball.update();
  });
}

skillDetails.addEventListener('click', () => {
  // flyball();
  spread = 60;
  pointRise(spread);
  // serpent();
});

// Controls
const gravityCanvas = document.querySelector('#gravity').addEventListener('click', () => {
  stop(globalID);
  start(ballInit, ballAnimate);
  currentInit = ballInit;
  currentAnim = ballAnimate;
});