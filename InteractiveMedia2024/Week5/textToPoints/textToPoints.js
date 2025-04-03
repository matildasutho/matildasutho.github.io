var font;
let points = [];
let bounds, word, size;

function preload(){
  font = loadFont("./data/Karrik-Italic.ttf");
 }
 
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(160, 0, 160);
  size = width/7;
  word = "Les Points";
  points = font.textToPoints(word,
  width / 7, // x position
  height / 2, // y position
  size, {
    sampleFactor: 0.75, // level of detial
  });
  
   bounds = font.textBounds(word, 0, 0, size);
}
function draw() {
   background(160, 0, 160);
  let xMapped = map(mouseX, 0, width, 1, 48);
    for (let p of points) {
      //noStroke();
      stroke("blue");
      fill(160);
      circle(p.x, p.y, xMapped);
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  size = width/7;
  textAlign(CENTER,CENTER);
  points = font.textToPoints(
    word, width/7, height/2, size, {
      sampleFactor: 0.75,
      simplifyThreshold: 0
    });
  names=[];
  bounds = font.textBounds(word, 0, 0, size); 
}