function setup() {
  createCanvas(512, 512);
  background(255);
}

var x0 = -1;
var y0 = -1;
var x1 = -1;
var y1 = -1;

function mousePressed() {
  x0 = mouseX;
  y0 = mouseY;
}

function mouseDragged() {
  x1 = mouseX;
  y1 = mouseY;
  background(255);
  noStroke();
  fill('red');
  ellipse(x0 - 3, y0 - 3, 6);
  fill('green');
  ellipse(x1 - 3, y1 - 3, 6);
}

function mouseReleased() {
  background(255);
  loadPixels();
  draw_line();
  updatePixels();
}

function set_pixel(x, y, d) {
  c = color(-d * (d < 0), d * (d > 0), 0)
  set(x, y, c)
}

function draw_line() {
  let dx = x1 - x0
  let dy = y1 - y0
  let dp = 2 * dy - dx
  let deq = 2 * dy
  let dinc = 2 * dy - 2 * dx
  let d = dp
  let y = y0
  for (let x = x0; x <= x1; x++) {
    set_pixel(Math.round(x), Math.round(y), 0)
    if(d < 0){
      d += deq
    } else {
      d += dinc
      y++
    }
  }
  updatePixels();
}
