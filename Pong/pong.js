let ball = new Ball();
let p1 = new Player();
let p2 = new Bot();

function difficulty() {
  drawRect(0, 0, 600, 400, "black");
  drawScore('easy', 270, 70, 'white');
  drawScore('hard', 270, 340, 'white');
  drawScore('medium', 250, 210, 'white');
  drawRect(0, 130, 600, 10, 'white');
  drawRect(0, 260, 600, 10, 'white');
  canvas.onmousedown = function(event) {
    if (event.clientY <= 130) {
      clearInterval(intervals[0]);
      intervals[0] = setInterval(render, 10);
      p2.speed = 1
    }
    else if (event.clientY >= 270){
      clearInterval(intervals[0]);
      intervals[0] = setInterval(render, 10);
      p2.speed = 3
    }
    else if (event.clientY <= 260 && event.clientY >= 140) {
      clearInterval(intervals[0]);
      intervals[0] = setInterval(render, 10);
      p2.speed = 2
    }
  };
}

function settings() {
  drawRect(0, 0, 600, 400, "black");
  drawScore('1 player', 100, 200, 'white');
  drawScore('2 player', 400, 200, 'white');
  drawRect(295, 0, 10, 400);
  canvas.onmousedown = function(event) {
    if (event.clientX <= 295) {
      clearInterval(intervals[0]);
      intervals[0] = setInterval(difficulty, 5);

    }
    else if (event.clientX >= 305){
      p2 = new Player();
      clearInterval(intervals[0]);
      intervals[0] = setInterval(render, 10);
    }
  };
}

function render() {
  drawRect(0, 0, 600, 400, "black");
  drawRect(10, p1.pos, 10, 100, "white");
  drawRect(580, p2.pos, 10, 100, "white");
  drawCircle(ball.x, ball.y, 5, "white");
  drawScore(`${p1.getScore()} : ${p2.getScore()}`, 270, 30, 'white');
  collision(p1, p2, ball);
  ball.move(p1, p2);
  keyboard(p1, p2);
  if (p2.bot) {
    p2.move(ball.y);
    p1.mouse(p1);
  }
}
var intervals = [setInterval(settings, 5)];