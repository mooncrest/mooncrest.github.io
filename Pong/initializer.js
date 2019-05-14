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
  this.x = 300, this.y = 200, this.dx = 4, this.dy = 0 + Math.ceil(Math.random() * 2);
  this.reset = function() {
    this.x = 300, this.y = 20, this.dy = 1 + Math.ceil(Math.random() * 2);
    this.dx = (this.dx > 0) ? 4 : -4;
  }
  this.move = function(p1, p2) {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0) {
      this.reset();
      p2.addScore();
      if (p2.bot) {
        p2.pos = 100
      }
    }

    else if (this.x > 600) {
      this.reset();
      p1.addScore();
      if (p2.bot) {
        p2.pos = 150
      }
    }
  }
}

function Bot() {
  let score = 0
  this.pos = 150, this.bot = true;
  this.speed = null;
  this.move = function(ball) {
    if (ball > this.pos + 90 && this.pos <= 300 - this.speed) {
      this.pos += this.speed;
    }
    else if (ball < this.pos + 65 && this.pos >= this.speed) {
      this.pos -= this.speed;
    }
  }
  this.getScore = function() {
    return score
  }
  this.addScore = function() {
    score ++
  }
}

function Player() {
  let bot = false;
  let score = 0;
  this.pos = 150;
  this.up = this.down = false;

  this.mouse = function(p1){
    canvas.onmousemove = function(event) {
      if (event.clientY - 50 < 0) {
        p1.pos = 0;
      } 
      else if (event.clientY + 50 > 400) {
        p1.pos = 300;
      }
      else {
        p1.pos = event.clientY - 50
      }
    };
  };

  this.getScore = function() {
    return score
  };

  this.addScore = function() {
    score ++
  }
}

function keyboard(p1, p2) {
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 38:
        p1.up = true;
        break;

      case 40:
        p1.down = true;
        break;

      case 83:
        // s
        p2.down = true;
        break;
      case 87:
        // w
        p2.up = true;
        break;
    }
  };
  document.onkeyup = function(event) {
    switch (event.keyCode) {
      case 38:
        p1.up = false;
        break;
      case 40:
        p1.down = false;
        break;
      case 83:
        // s
        p2.down = false;
        break;
      case 87:
        // w
        p2.up = false;
        break;
    }
  };

  if (p1.up && p1.pos > 0){
    p1.pos -= 2;
  }

  else if (p1.down && p1.pos < 300) {
    p1.pos += 2;
  }

  if (p2.up && p2.pos > 0){
    p2.pos -= 2;
  }

  else if (p2.down && p2.pos < 300) {
    p2.pos += 2;
  }
};


function collision(p1, p2, ball) {
  if (p1.pos <= ball.y && p1.pos + 100 >= ball.y && ball.x + ball.dx < 20
    && ball.x >= 10) {
    ball.dx = -ball.dx;
    ball.dy = Math.ceil((ball.y - p1.pos - 50) / 15)
  }

  else if (p2.pos <= ball.y && p2.pos + 100 >= ball.y && 580 < ball.x + ball.dx &&
    ball.x <= 590) {
    ball.dx = -ball.dx;
    ball.dy = Math.ceil((ball.y - p2.pos - 50) / 15)
  }

  if (ball.y + 5 > 400 || ball.y - 5 < 0) {
    ball.dy = -ball.dy
  }
}