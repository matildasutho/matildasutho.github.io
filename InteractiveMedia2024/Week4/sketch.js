// anything in the setup function will be run once
function setup() {
  // create a canvas, where your p5 sketch will live
  createCanvas(windowWidth, windowHeight);
  // set the background colour of the canvas
  background("black");
}

// anything in the draw function will be run over and over according the frame rate
function draw() {
  background("black");
  // face
  fill("white");
  noStroke();
  ellipse(windowWidth / 2, windowHeight / 2, 320, 430);

  // eyes
  // the push and pop functions are used to isolate the style changes to the eyes by creating a beginning and end point for the changes
  push();
  fill("white");
  stroke(0);
  strokeWeight(1);
  ellipse(windowWidth / 2 - 100, windowHeight / 2 - 90, 80, 40);
  ellipse(windowWidth / 2 + 100, windowHeight / 2 - 90, 30, 100);
  pop();

  // top lip
  fill("pink");
  noStroke();
  arc(windowWidth / 2 - 25, windowHeight / 2 + 100, 50, 20, PI, 0);
  arc(windowWidth / 2 + 25, windowHeight / 2 + 100, 50, 20, PI, 0);
  // bottom lip
  fill("red");
  noStroke();
  arc(windowWidth / 2, windowHeight / 2 + 100, 100, 40, 0, PI);

  // nose
  push();
  fill("yellow");
  strokeWeight(0.5);
  stroke(0);
  triangle(
    windowWidth / 2,
    windowHeight / 2 - 50,
    windowWidth / 2,
    windowHeight / 2 + 40,
    windowWidth / 2 + 20,
    windowHeight / 2 + 40
  );
  pop();

  irisMove();
}

function irisMove() {
  let x = map(mouseX, 0, width, 0, 10);
  let y = map(mouseY, 0, height, 0, 10);
  fill("green");
  circle(windowWidth / 2 - 100 + x, windowHeight / 2 - 90 + y, 30);
  circle(windowWidth / 2 + 100 + x, windowHeight / 2 - 90 + y, 30);
  fill("black");
  circle(windowWidth / 2 - 100 + x, windowHeight / 2 - 90 + y, 20);
  circle(windowWidth / 2 + 100 + x, windowHeight / 2 - 90 + y, 20);
}
