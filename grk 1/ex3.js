function setup() {
    createCanvas(800, 600);
    noLoop();
}

function draw() {
    //noprotect
    background(0);
    for (let y = 0; y < height; y++){
        for (let x = 0; x < width; x++) {
            set(x, y, color(100));
        }
    }
    updatePixels();
}

