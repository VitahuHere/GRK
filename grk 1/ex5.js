
let xt = 400, xlb = 100, xrb = 700, yt = 100, ylb = 500, yrb = 500;


function setup() {
    createCanvas(800, 600);
    noLoop();
}

function draw() {
    background(0)
    stroke(255);
    point(xt, yt);
    point(xlb, ylb);
    point(xrb, yrb);

    let cx = xt, cy = yt;
    for(let i = 0; i < 30000; i++) {
        let r = random([0, 1, 2, 3])
        switch (r) {
            case 0:
                cx = (cx + xt) / 2;
                cy = (cy + yt) / 2;
                break;
            case 1:
                cx = (cx + xlb) / 2;
                cy = (cy + ylb) / 2;
                break;
            case 2:
                cx = (cx + xrb) / 2;
                cy = (cy + yrb) / 2;
                break;
        }
        point(cx, cy);
    }
    updatePixels();
}

