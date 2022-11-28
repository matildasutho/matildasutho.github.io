let msg;
let serialOptions = { baudRate: 9600 };
let serial;
let bMsg = "OFF";
let mic;
let buttonConnect,buttonDisconnect;
let timer = 0;

function setup() {
  createCanvas(500, 500);
  background(255);
  
  // Setup Web Serial using serial.js
  serial = new Serial();
  serial.on(SerialEvents.CONNECTION_OPENED, onSerialConnectionOpened);
  serial.on(SerialEvents.CONNECTION_CLOSED, onSerialConnectionClosed);
  serial.on(SerialEvents.DATA_RECEIVED, onSerialDataReceived);
  serial.on(SerialEvents.ERROR_OCCURRED, onSerialErrorOccurred);

  //display messages and errors
  msg = createP('');
  
  buttonConnect = createButton('Connect Port');
  buttonConnect.position(20,20);
  buttonConnect.mousePressed(connectPort);
  
  buttonDisconnect = createButton('Disonnect Port');
  buttonDisconnect.position(150,20);
  buttonDisconnect.mousePressed(disconnectPort);
  
   // Create an Audio Input
  mic = new p5.AudioIn();
  // start the Audio Input
   mic.start();
}

async function connectPort() {
  if (!serial.isOpen()) {
    await serial.connectAndOpen(null, serialOptions);
    
  } else {
    serial.autoConnectAndOpenPreviouslyApprovedPort(serialOptions);
  }
}

async function disconnectPort() {
  if (serial.isOpen()) {
      serial.close();
  }
}

function draw() {
 
  let vol = mic.getLevel();
  let brightness = map(vol, 0, 1, 0, 255);
  console.log("Volume: " + vol);
  //send data every 200ms
   if (millis() >= 200 + timer){
    serialWriteTextData(brightness);
    timer = millis();
  }
}

// Callback function by serial.js when there is an error on web serial
 function onSerialErrorOccurred(eventSender, error) {
  console.log("onSerialErrorOccurred", error);
  msg.html(error);
}

// Callback function by serial.js when web serial connection is opened

function onSerialConnectionOpened(eventSender) {
  console.log("onSerialConnectionOpened");
  msg.html("Serial connection opened successfully");
}

// Callback function by serial.js when web serial connection is closed

function onSerialConnectionClosed(eventSender) {
  console.log("onSerialConnectionClosed");
  msg.html("onSerialConnectionClosed");
}

//Callback function serial.js when new web serial data is received
 
function onSerialDataReceived(eventSender, newData) {
  console.log("onSerialDataReceived", newData);
  msg.html("onSerialDataReceived: " + newData);
}
 
function serialWriteTextData(b) {
  let brighArr = [];
  brighArr.push(b);
  //'\n' is used as "end of line" character
  // it is imporant to add at the end of array so that Arduino knows that the received message is finished
  brighArr.push("'\n'");
  if (serial.isOpen() ) {
    console.log("Writing brightness to serial: ", brighArr);
    serial.writeLine(brighArr);
  }
}
