
// MQTT client details:
let broker = {
  hostname: 'physical-computing-zhdk.cloud.shiftr.io',
  port: 443
 };

// client credentials:
let creds = {
  clientID: 'p5',
  userName: 'physical-computing-zhdk',
  password: 'QO1d1kxcIhqD2pi2'
};

// MQTT client:
let client;
let colorPicker;

let topicColor = "color";
 
function setup() {
  createCanvas(100, 100);
  colorPicker = createColorPicker('#ed225d');
  colorPicker.position(0, height/2);
  
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

  // create a div for the response:
  remoteMsg = createP(" ");
  remoteMsg.position(20, 560);
}

function draw() {
  background(255);
  noStroke();
  sendColor(colorPicker.color());
}

// called when the client connects
function onConnect() {
  localMsg.html('Client is connected');
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
  console.log(receivedMessage);
   
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

function sendColor(c) {
  let r = c.levels[0];
  let g = c.levels[1];
  let b = c.levels[2];
  
  let rgb = String(r) + "," + String(g) + "-" + String(b);
  sendMqttMessage(String(rgb), topicColor);
  remoteMsg.html("R: " + r + ", G: " + g + ", B: " + b);
   
}
