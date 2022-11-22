
#include <WiFiNINA.h>
#include <MQTT.h>
#include "wifiCredentials.h"

const char ssid[] = WIFI_SSID;
const char pass[] = WIFI_PASS;
unsigned long lastValue = 0;
unsigned long lastMillis = 0;


WiFiClient net;
MQTTClient client;
int status = WL_IDLE_STATUS;  

void setup() {
  Serial.begin(115200);
  // attempt to connect to Wifi network:
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    // failed, retry
    Serial.print("No WiFi connection");
    delay(5000);
  }
  
  // once you are connected :
  Serial.println("You're connected to the network");

  //start mqtt
  client.begin("icicle.cloud.shiftr.io", net);
  connect();
  client.subscribe("sendSliderValue");
  
}

void loop() {
  client.loop();
  delay(10);
  int fadeAmount = sendSliderValue();
  

  // check if connected
  if (!client.connected()) {
    connect();
  }

  // publish a message roughly every second.
  if (fadeAmount  != lastValue) {
    //lastMillis = millis();
    
    
    int sliderValue = map(fadeAmount, 0, 250, 0, 255);
    client.publish("/sliderValue", String(sliderValue));
  }

  lastValue = analogRead(A0);

}


void connect() {
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("No Wifi connection...");
    delay(1000);
  }

  while (!client.connect("sutho", "icicle", "c9R8c9FeWXMQaN62")) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("\nconnected to MQTT!");
  client.subscribe("sendSliderValue");
}