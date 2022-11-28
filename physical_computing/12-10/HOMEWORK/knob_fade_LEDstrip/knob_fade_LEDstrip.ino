#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

#define PIN 5
#define button 4
#define NUMPIXELS 8

// When setting up the NeoPixel library, we tell it how many pixels,
// and which pin to use to send signals. Note that for older NeoPixel
// strips you might need to change the third parameter -- see the
// strandtest example for more information on possible values.
Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);


void setup() {
  Serial.begin(9600);
  pinMode(PIN, OUTPUT);
  pinMode(4, INPUT_PULLUP);
  pinMode(A0, INPUT);

  pixels.begin();
 
}

void loop() {
  // put your main code here, to run repeatedly:
  int rainbow = analogRead(A0);
  int knobvalue = map(rainbow, 0, 1023, 0, 255);
  int reverseknob = map(rainbow, 0, 1023, 255, 0);
  
  
  
  for (int i=0; i<NUMPIXELS; i++ ) {
    pixels.setPixelColor(i, pixels.Color(0, 50, 50));
    pixels.show();
  }

  int buttonState = digitalRead(button);
  Serial.println(buttonState);

  if (buttonState == 0) {
    buttonState = 0;

  }
  else {
    buttonState == 1;
  }
  


}









