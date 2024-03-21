let x, y;
let prevX;
let prevY;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  frameRate(random(1, 13));
}

function draw() {
  // draw 50 points at random on the screen using a for loop
  let i;
  for (i = 0; i < 50; i++) {
    let x = random(0, width);
    let y = random(0, height);
    mapped_x = map(mouseX, 0, width, 0, 125);
    mapped_y = map(mouseY, 0, height, 0, 125);
    stroke(mapped_y, 0, mapped_x, 100);
    circle(x, y, 2);

    //   draw a line between every circle from the current x and y value, to the previous values
    if (i < 50) {
      line(x, y, prevX, prevY);
    }
    // store the x y values for the next iteration of the loop
    prevX = x;
    prevY = y;
  }
}
