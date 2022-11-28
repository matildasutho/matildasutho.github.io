
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

let topicSlider = "slider";
let myslider;

function setup() {
  myslider = createSlider(0,255,0,1);
  myslider.position(180, 100);

  localMsg = createP(" ");
  localMsg.position(20, 530);
}

function sendSliderValue() {
  sendMqttMessage(myslider.value(), topicSlider);
}