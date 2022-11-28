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

#define PIN 2

LSM6 imu;
int maxVal = 0;
int minVal = 100;

char report[80];

void setup()
{
  Serial.begin(9600);
  Wire.begin();

  if (!imu.init())
  {
    Serial.println("Failed to detect and initialize IMU!");
    while (1);
  }
  imu.enableDefault();

  pinMode(2, OUTPUT);

}

void loop()
{
  imu.read();

  // snprintf(report, sizeof(report), "A: %6d %6d %6d    G: %6d %6d %6d",
  //   imu.a.x, imu.a.y, imu.a.z,
  //   imu.g.x, imu.g.y, imu.g.z);

  snprintf(report, sizeof(report), "A: %6d ",
     imu.a.z);
  Serial.println(report);

  delay(100);



  int moveLED = map(imu.a.z, minVal, maxVal, 0, 255);
  int range = 16000;
  int intensity = 0;
  
  if (range > maxVal) {
    maxVal = range;
  }
  if (range < minVal) {
    minVal = range;
  }

  analogWrite(2, moveLED);

  intensity = map(range, minVal, maxVal, 0, 255);

  
  

}
