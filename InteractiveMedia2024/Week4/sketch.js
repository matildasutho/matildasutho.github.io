let colors;
let faceFill, eyeFill, lip1, lip2, noseFill;
let dice1, dice2;

// anything in the setup function will be run once
function setup() {
  // create a canvas, where your p5 sketch will live
  createCanvas(windowWidth, windowHeight);
  // set the background colour of the canvas randomly using the randomColour function
  background(randomColour());

  colors = [
    randomColour(),
    randomColour(),
    randomColour(),
    randomColour(),
    randomColour(),
    randomColour(),
  ];
  faceFill = random(colors);
  eyeFill = random(colors);
  lip1 = random(colors);
  lip2 = random(colors);
  noseFill = random(colors);
  frameRate(3);
}

// anything in the draw function will be run over and over according the frame rate
function draw() {
  dice1 = random(0, 5);
  dice2 = random(0, 12);
  rectFill = random(colors);
  x_mapped = map(dice1, 0, 5, 0, width);
  y_mapped = map(dice2, 0, 5, 0, height);
  push();
  noStroke();
  fill(rectFill);
  rect(x_mapped, y_mapped, dice2 * 10, dice1 * 3);
  pop();
  // face
  fill(faceFill);
  noStroke();
  ellipse(windowWidth / 2, windowHeight / 2, 290, 353);

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
  fill(lip1);
  stroke(0);
  strokeWeight(1);
  arc(windowWidth / 2 - 25, windowHeight / 2 + 100, 50, 20, PI, 0);
  arc(windowWidth / 2 + 25, windowHeight / 2 + 100, 50, 20, PI, 0);
  // bottom lip
  fill(lip2);
  arc(windowWidth / 2, windowHeight / 2 + 100, 100, 40, 0, PI);

  // nose
  push();
  fill(noseFill);
  strokeWeight(0.5);
  stroke(0);
  triangle(
    windowWidth / 2,
    windowHeight / 2 - 50,
    windowWidth / 2,
    windowHeight / 2 + 50,
    windowWidth / 2 + 52,
    windowHeight / 2 + 50
  );
  pop();
  // have the eyes follow the cursor
  irisMove();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(randomColour());
}

function irisMove() {
  let x = map(mouseX, 0, width, 0, 10);
  let y = map(mouseY, 0, height, 0, 10);
  fill(eyeFill);
  circle(windowWidth / 2 - 100 + x, windowHeight / 2 - 90 + y, 30);
  circle(windowWidth / 2 + 100 + x, windowHeight / 2 - 90 + y, 30);
  fill("black");
  circle(windowWidth / 2 - 100 + x, windowHeight / 2 - 90 + y, 20);
  circle(windowWidth / 2 + 100 + x, windowHeight / 2 - 90 + y, 20);
}

function randomColour() {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  return color(r, g, b);
}
