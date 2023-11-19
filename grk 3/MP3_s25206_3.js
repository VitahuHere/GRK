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

function mouseReleased(){
  draw_line()
}

function set_pixel(x, y, d) {
  c = color(-d * (d < 0), d * (d > 0), 0)
  set(x, y, c)
}

function draw_line() {
  let dx = x1 - x0
  let dy = y1 - y0
  let a = dy / dx
  let b = y0 - a * x0
  for (let x = x0; x < x1; x++){
    let y = a*x + b
    console.log(x, y)
    set_pixel(Math.round(x), Math.round(y), 0)
  }
  updatePixels();
}
