#include <Servo.h>

Servo myservo;  // create servo object 
int pos = 0;    // variable to store the servo position


void setup() {
  Serial.begin(9600);
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  pinMode(12, INPUT_PULLUP);
}

void loop() {

  int buttonValue = digitalRead(12);
  Serial.println(buttonValue);

   if (buttonValue == 0) {
     myservo.write(90);    
  //    for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
  // //  in steps of 1 degree
  //     myservo.write(pos);              // tell servo to go to position in variable 'pos'
  //     delay(3);   
     
   }
   else {
     myservo.write(40);
   }
}