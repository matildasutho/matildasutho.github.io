/*
The sensor outputs provided by the library are the raw
16-bit values obtained by concatenating the 8-bit high and
low accelerometer and gyro data registers. They can be
converted to units of g and dps (degrees per second) using
the conversion factors specified in the datasheet for your
particular device and full scale setting (gain).

Example: An LSM6DS33 gives an accelerometer Z axis reading
of 16276 with its default full scale setting of +/- 2 g. The
LA_So specification in the LSM6DS33 datasheet (page 15)
states a conversion factor of 0.061 mg/LSB (least
significant bit) at this FS setting, so the raw reading of
16276 corresponds to 16276 * 0.061 = 992.8 mg = 0.9928 g.
*/

#include <Wire.h>
#include <LSM6.h>

// NeoPixel Ring simple sketch (c) 2013 Shae Erisson
// Released under the GPLv3 license to match the rest of the
// Adafruit NeoPixel library

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

// Which pin on the Arduino is connected to the NeoPixels?
#define PIN        5 // On Trinket or Gemma, suggest changing this to 1

// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS 8 // Popular NeoPixel ring size

// When setting up the NeoPixel library, we tell it how many pixels,
// and which pin to use to send signals. Note that for older NeoPixel
// strips you might need to change the third parameter -- see the
// strandtest example for more information on possible values.
Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

LSM6 imu;
int maxVal = 0;
int minVal = 100;

char report[80];

void setup()
{
  Serial.begin(9600);
  Wire.begin();

  pixels.begin(); 

  if (!imu.init())
  {
    Serial.println("Failed to detect and initialize IMU!");
    while (1);
  }
  imu.enableDefault();


}

void loop()
{
  pixels.clear();
  imu.read();

  // snprintf(report, sizeof(report), "A: %6d %6d %6d    G: %6d %6d %6d",
  // imu.a.x, imu.a.y, imu.a.z,
  // imu.g.x, imu.g.y, imu.g.z);

  snprintf(report, sizeof(report), "A: %6d ",
     imu.a.z);
  //Serial.println(report);

  // converting the range to PWM

  int range = 16000;
  int intensity = 0;

  
  if ( imu.a.z> maxVal) {
    maxVal =  imu.a.z;
  }
  if ( imu.a.z < minVal) {
    minVal =  imu.a.z;
  }

  int moveLED = map(imu.a.z, minVal, maxVal, 0, 50);

  Serial.println(moveLED);

  intensity = map(range, minVal, maxVal, 0, 255);

   for(int i=0; i<NUMPIXELS; i ++) { // For each pixel...
  
    // pixels.Color() takes RGB values, from 0,0,0 up to 255,255,255
    // Here we're using a moderately bright green color:
    pixels.setPixelColor(i, pixels.Color(0,0, 255));
    pixels.show();
  }
 
  pixels.setBrightness(moveLED);
  pixels.show();

    
}

