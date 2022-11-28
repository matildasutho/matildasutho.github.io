#include <WiFiNINA.h>
#include <MQTT.h>
#define WIFI_SSID "iad_zhdk"
#define WIFI_PASS "i@d_4ever"


int sendSliderValue;

#define ledpin 11

void setup() {
  // put your setup code here, to run once:
Serial.begin(115200);
  // attempt to connect to Wifi network:
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    // failed, retry
    Serial.print("No WiFi connection");
    delay(5000);
  }

  Serial.println("You're connected");

  client.begin("icicle.cloud.shiftr.io", net);
  //print message once is received
  client.onMessage(messageReceived);
  connect();
}

void loop() {
  client.loop();
  delay(10);

  // check if connected
  if (!client.connected()) {
    connect();
  }
}

void messageReceived(String &topic, String &payload) {
  Serial.println(topic + ": " + payload);
  digitalWrite(ledpin, payload.toInt());
}

void connect() {
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("No Wifi connection...");
    delay(1000);
  }

  while (!client.connect("slide", "icicle", "c9R8c9FeWXMQaN62")) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("\nconnected to MQTT!");
  //subscribe to message "ledBlink"
  client.subscribe("sendSliderValue");
}