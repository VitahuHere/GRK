function setup() {
    createCanvas(800, 600);
    noLoop();
}

function draw() {
    //noprotect
    background(0);
    let middleX = width / 2;
    let middleY = height / 2;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            {
                let dx = abs(x - middleX);
                let dy = abs(y - middleY);
                let d = sqrt(dx * dx + dy * dy);
                set(x, y, color(256-d, d, ((x + y) / (height + width)) * 256));
            }
        }
    }
    updatePixels();
}

