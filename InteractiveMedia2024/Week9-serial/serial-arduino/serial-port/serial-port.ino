#define NUM_VALUES 2
#define OUTPUT_PIN1 11
#define OUTPUT_PIN2 10

long lastSerialOut = 0;

void setup() {
  Serial.begin(9600);
  pinMode(OUTPUT_PIN1, OUTPUT);
  pinMode(OUTPUT_PIN2, OUTPUT);
}

void loop() {

  if (millis() > lastSerialOut + 100) { // only send once every 100 miliseconds
     // Send sensor data out over Serial
      Serial.println(analogRead(A0)/4);
      lastSerialOut = millis();
  }
 
}

/*
  SerialEvent occurs whenever a new data comes in the hardware serial RX. This
  routine is run between each time loop() runs, so using delay inside loop can
  delay response. 
*/
void serialEvent() {
  // Check to see if there is any incoming serial data
  if (Serial.available() > 0) {

    int incomingValues[NUM_VALUES];
    // read string until the end of the line
    String rcvdSerialData = Serial.readStringUntil('\n');
    split(rcvdSerialData, incomingValues, NUM_VALUES);

    analogWrite(OUTPUT_PIN1, incomingValues[0]);
    analogWrite(OUTPUT_PIN2, incomingValues[1]);
  }
}

void split(String inputString, int returnData[], int numOfValues) {
  // split comma seperated values into an array
  int index = 0;
  int lastPos = 0;

  for (int i = 0; i < inputString.length(); i++) {
    if (inputString.charAt(i) == ',' || inputString.charAt(i) == ';' && index < numOfValues) {
      String tempStr = inputString.substring(lastPos, i);
      // uncoment this line to test 
     // Serial.println(tempStr);
      returnData[index] = tempStr.toInt();
      index++;
      lastPos = i + 1;
    }
  }
}