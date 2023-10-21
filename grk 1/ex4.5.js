function setup() {
    createCanvas(800, 600);
    noLoop();
}

function draw() {
    background(0)

    // setting sky color
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height * 0.66; y++) {
            {
                set(x, y, color(213, 182, 240))
            }
        }
    }

    // setting grass color
    for (let x = 0; x < width; x++) {
        for (let y = height * 0.66; y < height; y++) {
            {
                set(x, y, color(25, 110, 27))
            }
        }
    }

    // setting random flowers in grass
    for (let i = 0; i < 1000; i++) {
        set(random(width), random(height * 0.66, height), color(random(256), random(256), random(256)))
    }

    // setting house color
    for (let x = width * 0.25; x < width * 0.75; x++) {
        for (let y = height * 0.33; y < height * 0.66; y++) {
            {
                set(x, y, color(99, 54, 12))
            }
        }
    }

    for (let y = height * 0.05; y < height * 0.33; y++) {
        let leftBoundary = width / 2 - ((y - height * 0.05) / (height * 0.33)) * (width * 0.4);
        let rightBoundary = width / 2 + ((y - height * 0.05) / (height * 0.33)) * (width * 0.4);

        for (let x = leftBoundary; x <= rightBoundary; x++) {
            set(x, y, color(237, 107, 97));
        }
    }
    updatePixels();
}

