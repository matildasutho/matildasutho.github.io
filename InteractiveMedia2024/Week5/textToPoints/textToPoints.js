var color1;
var font;
let points = [];

function preload() {
  font = loadFont("./data/Karrik-Italic.ttf");
}
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // color1 = color(random(0, 255), random(0, 255), random(0, 255));
  points = font.textToPoints("Les Points", width / 2 - 450, height / 2, 200, {
    sampleFactor: 0.2,
  });
  // let box = font.textBounds("DIAMONDS", 0, 200, 200);
}

function draw() {
  background(220, 30);
  xMapped = map(mouseX, 0, width, 4, 96);
  //for loop below, edit inside to change each point
  for (let p of points) {
    fill(xMapped);
    noStroke();
    ellipse(p.x, p.y, xMapped, xMapped);
  }
}
// function pointilize() {
//  for(let i = 0; i < points.length; i++) {
//    ellipse(points[i].x, points[i].y, 3, 3);
//  }
// }

//fill("pink");
//textSize(96);
//textFont("Bebas Neue");
//text("DIAMONDS", mouseX, mouseY);
