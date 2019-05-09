const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

function drawRect(x, y, width, height, colour) {
  ctx.fillStyle = colour;
  ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, colour) {
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill()
}

function drawScore(score, x, y, colour) {
  ctx.fillStyle = colour;
  ctx.font = "30px Arial";
  ctx.fillText(score, x, y);
}


let p1score = 0;
let p2score = 0;

let p1 = 150;
let p2 = 150;

function Ball() {
  this.x = 300;
  this.y = 200;
  this.dx = 1;
  this.dy = 0;
  this.reset = function() {
    this.x = 300;
    this.y = 200;
    this.dx = (this.dx > 0) ? -2 : 2;
    this.dy = 0;
  }
}

let ball = new Ball()

function render() {
  drawRect(0, 0, 600, 400, "black");
  drawRect(10, p1, 10, 100, "white");
  drawRect(580, p2, 10, 100, "white");
  drawCircle(ball.x, ball.y, 5, "white");
  drawScore(`${p1score} : ${p2score}`, 270, 30, 'white')

  if (p1 <= ball.y && p1 + 100 >= ball.y && ball.x + ball.dx < 20) {
    ball.dx = -(ball.dx - 1);
    ball.dy = Math.floor((ball.y - p1 - 50) / 12)
  }

  else if (p2 <= ball.y && p2 + 100 >= ball.y && 580 < ball.x + ball.dx) {
    ball.dx = -(ball.dx + 1);
    ball.dy = Math.floor((ball.y - p2 - 50) / 12)
  }

  if (ball.y + 5 > 400 || ball.y - 5 < 0) {
    ball.dy = -ball.dy
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x < 0) {
    ball.reset()
    p2score += 1;
  }

  else if (ball.x > 600) {
    ball.reset()
    p1score += 1;
  }

  if (ball.y > p2 + 90 && p2 <= 290) {
    p2 += 10
  }
  else if (ball.y < p2 + 10 && p2 >= 10) {
    p2 -= 10
  }
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 38:
        if (p1 > 0) {
          p1 -= 5
        }
        break;

      case 40:
        if (p1 < 300) {
          p1 += 5
        }
        break;
    }
  };

  canvas.onmousemove = function(event) {
    if (event.clientY - 50 < 0) {
      p1 = 0;
    } 
    else if (event.clientY + 50 > 400) {
      p1 = 300;
    }
    else {
      p1 = event.clientY - 50
    }
  }
}


setInterval(render, 5);