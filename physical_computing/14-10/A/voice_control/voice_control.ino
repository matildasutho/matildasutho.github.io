
#define OUTPUT_PIN 11
const int DELAY_MS = 200;
int inputVal; 

void setup() {
  Serial.begin(9600);
  pinMode(OUTPUT_PIN, OUTPUT);
}

void loop() {
  // Check to see if there is any incoming serial data
  if (Serial.available() > 0) {
    // read string until the endo of the line
    String rcvdSerialData = Serial.readStringUntil('\n');
    analogWrite(OUTPUT_PIN, rcvdSerialData.toInt());
    delay(DELAY_MS);
  }
}
