function setup() {
    createCanvas(800, 600);
    noLoop();
}

function draw() {
    //noprotect
    background(0);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++){
            set(x, y, color((x / width) * 256));
        }
    }
    updatePixels();
}

