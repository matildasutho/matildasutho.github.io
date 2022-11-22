#define whiteLight 10
int brightness = 0;
int fadeAmount = 5;

void setup() {
  // put your setup code here, to run once:
}

void loop() {
  analogWrite(whiteLight, brightness);

  brightness = brightness + fadeAmount;

  if (brightness <= 0 || brightness >=255) {
    fadeAmount = -fadeAmount;
  }
  delay(30);

  // put your main code here, to run repeatedly:
  //digitalWrite(whiteLight, 1);
  //delay(300);
  //digitalWrite(whiteLight, 0);
  //delay(300);
}
