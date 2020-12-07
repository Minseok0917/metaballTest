class Circle {
  constructor(context, positionX, positionY) {
    this.ctx = context;
    this.positionX = positionX;
    this.positionY = positionY;
    this.color = `rgba(0,0,0,1)`;
    this.left = random(-2, 2);
    this.top = random(-2, 2);
    this.size = random(10, 100);
  }
  draw() {
    const { ctx, positionX, positionY, size, color } = this;
    ctx.beginPath();
    ctx.fillStyle = color;
    // ctx.strokeStyle = color;
    ctx.arc(positionX, positionY, size, 0, Math.PI * 2);
    // ctx.stroke();
    ctx.fill();

    // this.line();
  }
  line() {
    const { ctx, positionX, positionY, size } = this;


    /* 
    -0.5  위 
    0  오른쪽
    0.5 아래
    1 왼쪽
    1.5 위
    */
    const pi = Math.PI;
    for (let angle = -0.5; angle < 1.5; angle += 0.1) {
      const degres = pi * angle;
      const x = positionX + Math.cos(degres) * size;
      const y = positionY + Math.sin(degres) * size;

      ctx.beginPath();
      ctx.fillStyle = "#f00";
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }


  }
  ball(array) {
    const { positionX, positionY, size } = this;
    const list = array.filter(f => {
      const { positionX: arrayX, positionY: arrayY, size: arraySize } = f;
      const x = Math.abs(positionX - arrayX) ** 2;
      const y = Math.abs(positionY - arrayY) ** 2;
      const line = Math.sqrt(x + y);
      const MaxSize = Math.max(size, arraySize);
      return (line > MaxSize && MaxSize + 30 < line);
    });
  }
  update() {
    const { positionX, positionY, left, top, size } = this;
    this.positionX = positionX + left;
    this.positionY = positionY + top;
    this.size = size - 1;
  }
}