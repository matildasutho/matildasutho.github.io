
// MQTT client details:
let broker = {
  hostname: 'icicle.cloud.shiftr.io',
  port: 443
 };

// client credentials:
let creds = {
  clientID: 'p5',
  userName: 'icicle',
  password: 'c9R8c9FeWXMQaN62'
};

// MQTT client:
let client;

// topics you want to subscribe to when you connect
// let topicXpos = 'posX';
// let topicYpos = 'posY';
// let topicDiameter = 'diameter';
// let topicBlink = 'ledBlink';

// in case you use json your topic would be 
// let topicPos = "pos";

//button
// let buttonBlink;
let clicked = false;

let lastTimeSent = 0;
const sendInterval = 100;

//formatted values, position of the circle
// let circleX, circleY, diameterJS;

let slider;
let topicSlider = 'slider';

function setup() {
  createCanvas(400, 400);
  // buttonBlink = createButton("LED");
  // buttonBlink.position(20,20);
  // buttonBlink.mouseClicked(sendBlink);

  slider = createSlider(0, 255, 0);
  slider.position(10, 10);
  slider.style('width', '300px');
  
  // Create an MQTT client:
  client = new Paho.MQTT.Client(broker.hostname, broker.port, creds.clientID);
  
  // set callback handlers for the client:
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  
  // connect to the MQTT broker:
  client.connect({ 
    onSuccess: onConnect, // callback function for when you connect
    userName: creds.userName, // username
    password: creds.password, // password
    useSSL: true   // use SSL

  
  } );
  
  // create a div for local messages:
  localMsg = createP(" ");
  localMsg.position(20, 530);

  // // create a div for the response:
  // remoteMsg = createP(" ");
  // remoteMsg.position(20, 560);
}


function draw() {


  // background(220);
  // noStroke();
  // // draw a circle when a message is received:
  // fill(0);
  // // circle moves with the message:
  // circle(circleX, circleY, diameterJS);

  // if you want to send a message every x seconds defined as sendInterval
  /*
    if (millis() - lastTimeSent > sendInterval) {
      //your message goes here
      lastTimeSent = millis();
    }
  */
}

// called when the client connects
function onConnect() {
  localMsg.html('Client is connected');
  client.subscribe(slider);
  // client.subscribe(topicYpos);
  // client.subscribe(topicDiameter);
}

// called when the client loses its connection
function onConnectionLost(response) {
  if (response.errorCode !== 0) {
    console.log(response.errorMessage);
    localMsg.html('onConnectionLost:' + response.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  let receivedMessage = message.payloadString;
  
  //let's split the message so we know which values we receive
  //startsWith() is a JavaScript function which checks if message starts with a particular word or series of characters
  if (receivedMessage.startsWith("posX")) {
   //
    let xPos = split(receivedMessage, ',');
    circleX = xPos[1];
  } else if(receivedMessage.startsWith("posY")){
    let yPos = split(receivedMessage, ',');
    circleY = yPos[1]; 
  } else if(receivedMessage.startsWith("diameter")){
    let Diameter = split(receivedMessage, ',');
    diameterJS = Diameter[1]; 
  }
  
   console.log(circleX);
   remoteMsg.html("posX: " + circleX + ", posY: " + circleY + ", diameter:" + diameterJS);
   
  /* Have a look at the commented out code in Arduino
   If message payload is formatted as a JSON object
   {"pos" : [ {"x": "xPos", "y": "yPos"} ]
   You can parse it and use the pos.x and pos.x as values
   var pos = JSON.parse(message.payloadString);
   xPos = pos.x;
   yPos = pos.y;
   */
}

// called when you want to send a message:
function sendMqttMessage(msg, tpc) {
  // if the client is connected to the MQTT broker:
  if (client.isConnected()) {
    // start an MQTT message:
    message = new Paho.MQTT.Message(JSON.stringify(msg));
    // choose the destination topic:
    message.destinationName = tpc;
    // send it:
    client.send(message);
    // print what you sent:
    localMsg.html('I sent: ' + message.payloadString);
  }
}

function sendFade() {
  if (clicked) {
    sendMqttMessage(0, slider);
  } else {
    sendMqttMessage(1, slider);
  }
  clicked = !clicked;
}
