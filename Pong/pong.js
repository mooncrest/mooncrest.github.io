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
  ctx.fill();
}

function drawScore(score, x, y, colour) {
  ctx.fillStyle = colour;
  ctx.font = "30px Arial";
  ctx.fillText(score, x, y);
}

function Ball() {
  this.x = 300, this.y = 200, this.dx = 2, this.dy = 0 + Math.floor(Math.random() * 2);
  this.reset = function() {
    this.x = 300, this.y = 20, this.dy = 1;
    this.dx = (this.dx > 0) ? 2 : -2;
  }
  this.move = function(p1, p2) {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0) {
      this.reset();
      p2.score += 1;
      if (p2.bot) {
        p2.pos = 150
      }
    }

    else if (this.x > 600) {
      this.reset();
      p1.score += 1;
      if (p2.bot) {
        p2.pos = 150
      }
    }
  }
}

function Bot() {
  this.pos = 150, this.score = 0, this.bot = true;
  this.move = function(ball) {
    if (ball > this.pos + 90 && this.pos <= 298) {
      this.pos += 1;
    }
    else if (ball < this.pos + 65 && this.pos >= 2) {
      this.pos -= 1;
    }
  }
}

function Player() {
  this.pos = 150, this.score = 0, this.bot = false;
  this.up = this.down = false;
  this.mouse = function() {
    this.pos = this.pos;
  };
}

function keyboard(player) {
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 38:
        player.up = true;
        break;

      case 40:
        player.down = true;
        break;
    }
  };

  document.onkeyup = function(event) {
    switch (event.keyCode) {
      case 38:
        player.up = false;
        break;
      case 40:
        player.down = false;
        break;
    }
  };

  if (player.up && player.pos > 0){
    player.pos -= 2;
  }

  else if (player.down && player.pos < 300) {
    player.pos += 2;
  }
}

function mouse(player) {
  canvas.onmousemove = function(event) {
    if (event.clientY - 50 < 0) {
      player.pos = 0;
    } 
    else if (event.clientY + 50 > 400) {
      player.pos = 300;
    }
    else {
      player.pos = event.clientY - 50
    }
  }
}

function collision(p1, p2, ball) {
  if (p1.pos <= ball.y && p1.pos + 100 >= ball.y && ball.x + ball.dx < 20) {
    ball.dx = -ball.dx;
    ball.dy = Math.floor((ball.y - p1.pos - 50) / 15)
  }

  else if (p2.pos <= ball.y && p2.pos + 100 >= ball.y && 580 < ball.x + ball.dx) {
    ball.dx = -ball.dx;
    ball.dy = Math.floor((ball.y - p2.pos - 50) / 15)
  }

  if (ball.y + 5 > 400 || ball.y - 5 < 0) {
    ball.dy = -ball.dy
  }
}

let ball = new Ball();
let p1 = new Player();
let p2 = new Bot();

function render() {
  drawRect(0, 0, 600, 400, "black");
  drawRect(10, p1.pos, 10, 100, "white");
  drawRect(580, p2.pos, 10, 100, "white");
  drawCircle(ball.x, ball.y, 5, "white");
  drawScore(`${p1.score} : ${p2.score}`, 270, 30, 'white')
  collision(p1, p2, ball)
  ball.move(p1, p2)
  p2.move(ball.y)
  keyboard(p1)
  mouse(p1)
}

setInterval(render, 5);