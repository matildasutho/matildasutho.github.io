var counter;
var accent;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255, 255, 255);
  counter = 0;
  textSize(20);
  capture = createCapture(VIDEO);
  capture.hide();
  imageMode(CENTER);
  accent = "#f9a6ff";
}

function draw() {
  background(255, 255, 255, 100);
  image(capture, width / 2, height / 2, width, height);
  filter(THRESHOLD);
  noStroke();
  fill(accent);
  circle(mouseX, mouseY, 16);
}
