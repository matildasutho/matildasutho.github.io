#define analogPin A0
#define whitePin 11
#define greenPin 12
#define redPin 13


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(whitePin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(redPin, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  int sensorValue = analogRead(analogPin);
  Serial.println(sensorValue);
  delay(50);
    if (sensorValue > 60) {
    digitalWrite(redPin, 1);
    digitalWrite(greenPin, 0);
    digitalWrite(whitePin, 0);
    }
    if (sensorValue > 450) {
    digitalWrite(redPin, 0);
    digitalWrite(greenPin, 1);
    digitalWrite(whitePin, 0);
    }
    if (sensorValue > 950) {
    digitalWrite(redPin, 0);
    digitalWrite(greenPin, 0);
    digitalWrite(whitePin, 1);
    }
}
