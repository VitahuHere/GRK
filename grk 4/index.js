var imgA;
var imgB;

var currentTransformation = "identity";
var xInput;
var yInput;

function cleanCanvas() {
    imgA = createImage(512, 512);
    imgB = createImage(512, 512);
    imgA.loadPixels();
    imgB.loadPixels();
    var d = pixelDensity();
    for (var i = 0; i < 512 * 512 * 4 * d; i += 4) {
        imgA.pixels[i] = 240;
        imgA.pixels[i + 1] = 250;
        imgA.pixels[i + 2] = 240;
        imgA.pixels[i + 3] = 255;
        imgB.pixels[i] = 240;
        imgB.pixels[i + 1] = 240;
        imgB.pixels[i + 2] = 250;
        imgB.pixels[i + 3] = 255;
    }
    imgA.updatePixels();
    imgB.updatePixels();
}

function setup() {
    createCanvas(512, 512);
    background(255);
    imgA = createImage(512, 512);
    imgB = createImage(512, 512);
    imgA.loadPixels();
    imgB.loadPixels();
    var d = pixelDensity();
    for (var i = 0; i < 512 * 512 * 4 * d; i += 4) {
        imgA.pixels[i] = 240;
        imgA.pixels[i + 1] = 250;
        imgA.pixels[i + 2] = 240;
        imgA.pixels[i + 3] = 255;
        imgB.pixels[i] = 240;
        imgB.pixels[i + 1] = 240;
        imgB.pixels[i + 2] = 250;
        imgB.pixels[i + 3] = 255;
    }
    imgA.updatePixels();
    imgB.updatePixels();
    let identityButton = createButton("Identity");
    let scaleButton = createButton("Scale");
    let rotationButton = createButton("Rotation");
    let shearButton = createButton("Shear");
    let translationButton = createButton("Translation");
    let cleanButton = createButton("Clean canvas");

    function resetButtons() {
        identityButton.style("background-color", "white");
        scaleButton.style("background-color", "white");
        rotationButton.style("background-color", "white");
        shearButton.style("background-color", "white");
        translationButton.style("background-color", "white");
    }

    identityButton.position(550, 10);
    scaleButton.position(550, 40);
    rotationButton.position(550, 70);
    shearButton.position(550, 100);
    translationButton.position(550, 130);
    cleanButton.position(550, 160);

    identityButton.mousePressed(() => {
        resetButtons();
        currentTransformation = "identity";
        identityButton.style("background-color", "green");
    });
    scaleButton.mousePressed(() => {
        resetButtons();
        currentTransformation = "scale";
        scaleButton.style("background-color", "green");
    });
    rotationButton.mousePressed(() => {
        resetButtons();
        currentTransformation = "rotation";
        rotationButton.style("background-color", "green");
    });
    shearButton.mousePressed(() => {
        resetButtons();
        currentTransformation = "shear";
        shearButton.style("background-color", "green");
    });
    translationButton.mousePressed(() => {
        resetButtons();
        currentTransformation = "translation";
        translationButton.style("background-color", "green");
    });
    cleanButton.mousePressed(cleanCanvas);

    let xLabel = createP("X");
    let yLabel = createP("Y");
    xLabel.position(520, 180);
    yLabel.position(520, 210);

    xInput = createInput();
    yInput = createInput();
    xInput.position(550, 190);
    yInput.position(550, 220);
}

function draw() {
    if (!keyIsDown(32)) {
        image(imgA, 0, 0);
        text("Image A", 10, 20);
    } else {
        image(imgB, 0, 0);
        text("Image B", 10, 20);
    }
    text("Press SPACE to change image", 10, 40);
}

function makeVector(x, y) {
    return [x, y, 1];
}

function makeIdentity() {
    return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ];
}

function makeTranslation(x, y) {
    return [
        [1, 0, x],
        [0, 1, y],
        [0, 0, 1],
    ];
}

function makeScale(x, y) {
    return [
        [x, 0, 0],
        [0, y, 0],
        [0, 0, 1],
    ];
}

function makeRotation(angle) {
    angle = radians(angle);
    return [
        [cos(angle), -sin(angle), 0],
        [sin(angle), cos(angle), 0],
        [0, 0, 1],
    ];
}

function makeShear(x, y) {
    return [
        [1, x, 0],
        [y, 1, 0],
        [0, 0, 1],
    ];
}

function multiplyVector(matrix, vector) {
    let result = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        result[i] = 0;
        for (let j = 0; j < 3; j++) {
            result[i] += matrix[i][j] * vector[j];
        }
    }
    return result;
}

function multiplyMatrix(matrixA, matrixB) {
    let result = makeIdentity();
    for (let i = 0; i < 3; i++) {
        result[i] = [0, 0, 0];
        for (let j = 0; j < 3; j++) {
            result[i][j] = 0;
            for (let k = 0; k < 3; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
    return result;
}

function drawVector(img, vec) {
    img.set(vec[0], vec[1], color(255, 0, 0));
    img.updatePixels();
}

function mouseDragged() {
    let vector = makeVector(mouseX, mouseY);
    let transformationB = makeIdentity();
    switch (currentTransformation){
        case "identity":
            transformationB = makeIdentity();
            break;
        case "scale":
            transformationB = makeScale(xInput.value(), yInput.value());
            break;
        case "rotation":
            transformationB = makeRotation(xInput.value());
            break;
        case "shear":
            transformationB = makeShear(xInput.value(), yInput.value());
            break;
        case "translation":
            transformationB = makeTranslation(xInput.value(), yInput.value());
            break;
    }

    let transformedVectorB = multiplyVector(transformationB, vector);

    drawVector(imgA, vector);
    drawVector(imgB, transformedVectorB);
}
