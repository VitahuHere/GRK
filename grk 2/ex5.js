function preload() {
    img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}
function setup() {
    createCanvas(256, 256);
    img.filter('gray');

    let histogram = new Array(256);
    histogram = histogram.fill(0);
    img.loadPixels();

    count = 0;
    for(i = 0; i < img.pixels.length; i += 4) {
        if(img.pixels[i] === 0) count++;
    }
    console.log(count);

    for (x = 0; x < img.width; x++)
        for (y = 0; y < img.height; y++) {
            pos = 4 * (y * img.width + x);
            histogram[img.pixels[pos]]++;
        }

    background(255);
    stroke(0);
    for (i = 0; i < 256; i++) {
        line(i, 256, i, 256 - (histogram[i]/Math.max(...histogram) * 256 * 15));
    }
}
