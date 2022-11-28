
#include <WiFiNINA.h>
#include <MQTT.h>
#include "wifiCredentials.h"
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

// Which pin on the Arduino is connected to the NeoPixels?
#define PIN        6 // On Trinket or Gemma, suggest changing this to 1

// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS 8 // Popular NeoPixel ring size

// When setting up the NeoPixel library, we tell it how many pixels,
// and which pin to use to send signals. Note that for older NeoPixel
// strips you might need to change the third parameter -- see the
// strandtest example for more information on possible values.
Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);
#define DELAYVAL 500 // Time (in milliseconds) to pause between pixels

const char ssid[] = WIFI_SSID;
const char pass[] = WIFI_PASS;

WiFiClient net;
MQTTClient client;
int status = WL_IDLE_STATUS;  

unsigned long lastMillis = 0;

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
  //change this to match your instance name
  client.begin("physical-computing-zhdk.cloud.shiftr.io", net);
  client.onMessage(messageReceived);
  connect();

  pixels.begin(); // INITIALIZE NeoPixel strip object (REQUIRED)
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
  //Serial.println(topic + ": " + payload);
  int index = payload.indexOf(",");
  int index2 = payload.indexOf("-");

  int r = payload.substring(1, index).toInt();
  int g = payload.substring(index+1, index2).toInt();
  int b = payload.substring(index2+1, payload.length()-1).toInt();

  pixels.clear(); // Set all pixel colors to 'off'
  for(int i=0; i< NUMPIXELS; i++) { // For each pixel...
    // pixels.Color() takes RGB values, from 0,0,0 up to 255,255,255
    // Here we're using a moderately bright green color:
   pixels.setPixelColor(i, pixels.Color(r,g,b));
   pixels.show();   // Send the updated pixel colors to the hardware.
  }
}

void connect() {
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("No Wifi connection...");
    delay(1000);
  }

  //change this to match your instance
  while (!client.connect("arduino", "physical-computing-zhdk", "QO1d1kxcIhqD2pi2")) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("\nconnected to MQTT!");
  client.subscribe("color");
}