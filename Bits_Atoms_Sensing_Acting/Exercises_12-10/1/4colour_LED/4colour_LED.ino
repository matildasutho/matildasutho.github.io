// NeoPixel Ring simple sketch (c) 2013 Shae Erisson
// Released under the GPLv3 license to match the rest of the
// Adafruit NeoPixel library

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

// Which pin on the Arduino is connected to the NeoPixels?
#define PIN        5 // On Trinket or Gemma, suggest changing this to 1
#define PIN_2      6

// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS 8 // Popular NeoPixel ring size
#define button 4

// When setting up the NeoPixel library, we tell it how many pixels,
// and which pin to use to send signals. Note that for older NeoPixel
// strips you might need to change the third parameter -- see the
// strandtest example for more information on possible values.
Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel pixels2(NUMPIXELS, PIN_2, NEO_GRB + NEO_KHZ800);




int color1;
int color2;
int color3;

void setup() {
  // These lines are specifically to support the Adafruit Trinket 5V 16 MHz.
  // Any other board, you can remove this part (but no harm leaving it):
#if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
  clock_prescale_set(clock_div_1);
#endif
  // END of Trinket-specific code.
  pinMode(4, INPUT_PULLUP);



  pixels.begin(); // INITIALIZE NeoPixel strip object (REQUIRED)
  pixels2.begin(); // INITIALIZE NeoPixel strip object (REQUIRED)


}

void loop() {
  pixels.clear(); // Set all pixel colors to 'off'
  pixels2.clear();

  int buttonValue = digitalRead(button);
  if (buttonValue==1) { 
    buttonValue=1;
    color1=255;
    color2=255;
    color3=255;
  }
  if (buttonValue==0) {
    buttonValue=0;
    color1=0;
    color2=0;
    color3=0;
  }

  

  // The first NeoPixel in a strand is #0, second is 1, all the way up
  // to the count of pixels minus one.
  for(int i=0; i<NUMPIXELS; i++) { // For each pixel...
  
    // pixels.Color() takes RGB values, from 0,0,0 up to 255,255,255
    // Here we're using a moderately bright green color:
    pixels.setPixelColor(i, pixels.Color(color1, color2, color3));
    

    pixels.show();   // Send the updated pixel colors to the hardware.

     // Pause before next pass through loop
  }
    for(int j=0; j<NUMPIXELS; j++) { // For each pixel...
  
    // pixels.Color() takes RGB values, from 0,0,0 up to 255,255,255
    // Here we're using a moderately bright green color:
    pixels2.setPixelColor(j, pixels.Color(color1, color2, color3));
    

    pixels2.show();   // Send the updated pixel colors to the hardware.

     // Pause before next pass through loop
  }
  // for(int j=1; j<NUMPIXELS; j += 4) { // For each pixel...
  
  //   // pixels.Color() takes RGB values, from 0,0,0 up to 255,255,255
  //   // Here we're using a moderately bright green color:
  //   pixels.setPixelColor(j, pixels.Color(0, 0, 255));

  //   pixels.show();   // Send the updated pixel colors to the hardware.

  //    // Pause before next pass through loop
  // }
  // for(int k=2; k<NUMPIXELS; k += 4) { // For each pixel...
  
  //   // pixels.Color() takes RGB values, from 0,0,0 up to 255,255,255
  //   // Here we're using a moderately bright green color:
  //   pixels.setPixelColor(k, pixels.Color(0, 255, 0));

  //   pixels.show();   // Send the updated pixel colors to the hardware.

  //    // Pause before next pass through loop
  // }
  //   for(int l=3; l<NUMPIXELS; l += 4) { // For each pixel...
  
  //   // pixels.Color() takes RGB values, from 0,0,0 up to 255,255,255
  //   // Here we're using a moderately bright green color:
  //   pixels.setPixelColor(l, pixels.Color(240, 160, 0));

  //   pixels.show();   // Send the updated pixel colors to the hardware.

  //    // Pause before next pass through loop
  // }

}
