function setup() {
  createCanvas(512, 512);
  background(255);
}

var last_x = -1;
var last_y = -1;

function mouseDragged() {
  if (mouseButton != LEFT) return;
  if (last_x > 0) {
    line(last_x, last_y, mouseX, mouseY);
  }
  last_x = mouseX;
  last_y = mouseY;
}

function mouseReleased() {
  last_x = last_y = -1;
  if (mouseButton == RIGHT) {
    loadPixels();
    flood_fill(mouseX, mouseY);
    updatePixels();
  }
}

function set_pixel(x, y, d) {
  c = color(-d * (d < 0), d * (d > 0), 0)
  set(x, y, c)
}

function get_pixel(x, y) {
  idx = (y * 512 + x) * 4;
  return pixels[idx];
}

//właściwa funkcja do wypełniania
function flood_fill(x, y) {
  let stos  = []
  stos.push([x, y])
  let counter = 0
  while(stos.length > 0 && counter < 10000){
    let [x, y] = stos.pop()
    if (x < 0 || x > width || y < 0 || y > height) continue
    let color = get_pixel(x, y)
    if (color !== 255) continue
    set(x, y, 200)
    stos.push([x, y-1], [x, y+1], [x-1, y], [x+1, y])
  }
}