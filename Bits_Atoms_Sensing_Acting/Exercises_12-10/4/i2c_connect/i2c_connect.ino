// Arduino Slave Sketch

#include <Wire.h>

byte recI2C;            // data received from I2C bus
unsigned long time_start;   // start time in mSec
int ledVal;               // status of LED: 1 = ON, 0 = OFF
byte potVal;               // potentiometer position

void setup(){
  Wire.begin(0x08);           // join I2C bus as Slave with address 0x08
  // event handler initializations
  Wire.onReceive(dataRcv);    // register an event handler for received data
  Wire.onRequest(dataRqst);   // register an event handler for data requests
  
  // initialize global variables
  recI2C = 255;
  time_start = millis();
  ledVal = 0;
  pinMode(11, OUTPUT);        // set pin 13 mode to output
    Serial.begin(9600);
}

void loop(){

  potVal = analogRead(A0); // read analog value at pin A0 (potentiometer voltage)
  
  // blink logic code
        if((millis() - time_start) > (1000 * (float)(recI2C/255))) {
    ledVal = !ledVal;
    time_start = millis();
  }
  digitalWrite(11, ledVal);

}

//received data handler function
void dataRcv(int numBytes){
  while(Wire.available()) { // read all bytes received
    recI2C = Wire.read();
  }
}

// requests data handler function
void dataRqst(){
  Wire.write(potVal); // send potentiometer position
}