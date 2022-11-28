#define redPin 10

void setup() {
  pinMode(redPin, OUTPUT);
}
void loop() {
  int x = 0;
  int y = 1;
  //constrain(x, 0, 255);
  //constrain(y, 0, 255);
  int fadeIn = --x;
  int fadeOut = y++;
  
  analogWrite(redPin, (fadeIn));
  if (fadeIn >= 255) {
  analogWrite(redPin, (fadeOut));
  }
}

