let msg;
let serialOptions = { baudRate: 9600 };
let serial;
let isConnected = false;
let dataIn = 0;
let textY = 40;

function setup() {
  createCanvas(500,500);
  background(100);
  textFont('Courier New');
  textSize(20);
  // Setup Web Serial using serial.js
  // remember to include the library in index.html:   <script src="https://cdn.jsdelivr.net/gh/makeabilitylab/p5js/_libraries/serial.js"></script>
  serial = new Serial();
  serial.on(SerialEvents.CONNECTION_OPENED, onSerialConnectionOpened);
  serial.on(SerialEvents.CONNECTION_CLOSED, onSerialConnectionClosed);
  serial.on(SerialEvents.DATA_RECEIVED, onSerialDataReceived);
  serial.on(SerialEvents.ERROR_OCCURRED, onSerialErrorOccurred);
  msg = "Not connected";
  
}

function draw() {
  background(dataIn);
  fill(0,255,0);
  text(msg,40,textY)
}

function mouseMoved() {
  let mapedX = map(mouseX,0,width,0,255);
  mapedX = floor(mapedX);
  let mapedY = map(mouseY,0,height,0,255);
  mapedY = floor(mapedY);
  serialWriteArrayData([mapedX, mapedY]);
}

function mouseClicked() {
  if (!isConnected) {
    isConnected = connectPort(); 
  }
}

async function connectPort() {
  if (!serial.isOpen()) {
    await serial.connectAndOpen(null, serialOptions);
  } else {
    serial.autoConnectAndOpenPreviouslyApprovedPort(serialOptions);
    return true;
  }
}

 function onSerialErrorOccurred(eventSender, error) {
  console.log("onSerialErrorOccurred", error);
  msg = "Serial Error Occurred!";
}

function onSerialConnectionOpened(eventSender) {
  console.log("Serial connection opened successfully");
  msg = "🌈 connected!";
}

function onSerialConnectionClosed(eventSender) {
  console.log("onSerialConnectionClosed");
  msg = "Connection Closed!";
}

function onSerialDataReceived(eventSender, newData) {
  console.log("onSerialDataReceived", newData);
  msg = "Received: " + newData;
  dataIn = int(newData); // safely update dataIn
}
 
async function serialWriteArrayData(data) {
  if (serial.isOpen()) {
    let dataFormated = "";
    for(i=0;i<data.length;i++) {
      dataFormated +=data[i];
      dataFormated += ",";
    }
    console.log("send data: "+dataFormated)
        serial.writeLine(dataFormated);
  }
}
