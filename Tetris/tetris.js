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


