let table;
let root;
let font;
let title;
let cam;

let sliderX, sliderY;
let cX;
let cY;

let valueX, valueY;
let prevSliderXValue, prevSliderYValue;

function preload() {
  // data table
  table = loadTable("networked-data-002.csv", "header");
  // custom font
  font = loadFont("./assets/SonoVariable.ttf");
}

function setup() {
  // Including WEBGL here sets you canvas to 3D mode
  createCanvas(innerWidth, innerHeight, WEBGL);
  background(0);
  // what we will manipulate with the slider
  cam = createCamera();
  // call the sliderBuold function, where all of our slider settings are housed
  sliderBuild();
  // create a root object to hold the data
  root = {};
  title = "NETWORKED DATA";
  textFont(font);
  // this for loop will iterate through the table and create the parent and child objects
  for (var r = 0; r < table.getRowCount(); r++) {
    var row = table.getRow(r);
    var parentLabel = row.getString(0).toUpperCase();

    // If the parent label doesn't exist in the root object, add it
    if (!root[parentLabel]) {
      root[parentLabel] = {};
    }
    // this for loop will iterate through the columns and create the child objects
    for (var c = 1; c < table.getColumnCount(); c++) {
      var childLabel = row.getString(c);
      root[parentLabel][childLabel.toUpperCase()] = {};
    }
  }

  // select a div we have already created on the index.html
  let divBox = select(".coords");

  // create an HTML <p> element and set the class to fixedX and fixedY
  valueX = createP();
  valueY = createP();
  valueX.addClass("fixedX");
  valueY.addClass("fixedy");
  // place th etwo new <p> tags inside the div
  divBox.child(valueX);
  divBox.child(valueY);
}

function draw() {
  background(0);
  // Set the camera position
  let cX = sliderX.value();
  let cY = sliderY.value();
  cam.setPosition(cX, cY, height / 2.0 / tan((PI * 30.0) / 180.0));

  valueX.html("X: " + sliderX.value());
  valueY.html("Y: " + sliderY.value());
  // function to disable the orbit controls when the slider value is changing
  if (
    sliderX.value() !== prevSliderXValue ||
    sliderY.value() !== prevSliderYValue
  ) {
  } else {
    orbitControl(5);
  }

  //draw the mind map and set textSize for the title
  textSize(24);
  drawTree(root, "NETWORKED DATA", width / 2, height / 2, width / 2);
  rotate;

  // give th epreviou sslider a value at the end of the loop, so that when the function is called above the prev slider value is different to the new slide value.
  prevSliderXValue = sliderX.value();
  prevSliderYValue = sliderY.value();
}

function sliderBuild() {
  // create sliders a give them a range between 0 and total width/height times two,
  // and set the default point to half of the width/height
  sliderX = createSlider(0, width * 2, width / 2);
  sliderY = createSlider(-height, height * 2, height / 2);

  // place them on the canvas with x and y position of the top left corner
  sliderX.position(100, 20);
  sliderY.position(100, 70);
  // give them a width in pixels
  sliderX.size(200);
  sliderY.size(200);
  // add a class to the sliders to style them futher in CSS (see th eindex.html file)
  sliderX.addClass("dateSlider");
  sliderY.addClass("dateSlider");
}

function drawTree(
  tree,
  label,
  x,
  y,
  levelWidth,
  angle = 0,
  angleStep = TWO_PI
) {
  // Draw the label
  push();
  stroke(50);
  translate(x, y);
  textAlign(CENTER, TOP);
  text(label, 0, 0);
  pop();

  // Draw the children
  var children = Object.keys(tree);
  var numChildren = children.length;
  var angleBetween = angleStep / numChildren;
  for (var i = 0; i < numChildren; i++) {
    var childAngle = angle + i * angleBetween;
    var childX = x + (width / 2) * cos(childAngle);
    var childY = y + (width / 2) * sin(childAngle);

    // Check if the child object is not empty
    if (Object.keys(children[i]).length > 0) {
      stroke(30);
      line(x, y, childX, childY);
      drawTree(
        tree[children[i]],
        children[i],
        childX,
        childY,
        levelWidth / 2,
        childAngle,
        angleBetween
      );
    }
  }
}
