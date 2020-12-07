const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
let drag = false;
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;
let circles = [];
let downX = null;
let downY = null;
canvas.width = winWidth;
canvas.height = winHeight;



function mouseDown(event) {
  const { offsetX, offsetY } = event;
  downX = offsetX;
  downY = offsetY;
  drag = true;
  requestAnimationFrame(downLoop);
}

function mouseUp(event) {
  drag = false;
}

function mouseMove(event) {
  const { offsetX, offsetY } = event;
  downX = offsetX;
  downY = offsetY;
  if (drag) {
    const circle = new Circle(ctx, offsetX, offsetY);
    circles = [...circles, circle];
  }
}

function downLoop() {
  const circle = new Circle(ctx, downX, downY);
  circles = [...circles, circle];
  if (drag) {
    requestAnimationFrame(downLoop);
  }
}

function circleLoop() {
  ctx.clearRect(0, 0, winWidth, winHeight);
  for (const circle of circles) {
    const Notcircle = circles.filter(f => f != circle);
    circle.draw();
    circle.update();
    circle.ball(Notcircle);
    if (circle.size === 0) {
      circles = Notcircle;
    }
  }
  requestAnimationFrame(circleLoop);
}

requestAnimationFrame(circleLoop);

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mouseup", mouseUp);