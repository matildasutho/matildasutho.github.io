var counter;
var accent;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255, 255, 255);
  counter = 0;
  textSize(20);
  capture = createCapture(VIDEO);
  capture.hide();

  accent = "#f9a6ff";
}

function draw() {
  background(255, 255, 255, 100);
  image(capture, width / 2 - 320, height / 2 - 240, 640, 480);
  filter(THRESHOLD);
  noStroke();
  fill(accent);
  circle(mouseX, mouseY, 16);
}
