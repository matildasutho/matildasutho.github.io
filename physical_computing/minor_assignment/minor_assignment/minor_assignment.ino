#define MOTOR_PIN_A 5
#define MOTOR_PIN_B 6
#define MOTOR_PIN_C 9
#define MOTOR_PIN_D 10

#define leftSensor A5
#define rightSensor A4

#define ledHeart 11


const byte START = 0;
const byte FORWARD = 1;
const byte LEFT = 2;
const byte RIGHT = 3;

int wheelSpeed = 60;
byte myState;



void setup() {
  Serial.begin(9600);

  pinMode(MOTOR_PIN_A, OUTPUT);
  pinMode(MOTOR_PIN_B, OUTPUT);
  pinMode(MOTOR_PIN_C, OUTPUT);
  pinMode(MOTOR_PIN_D, OUTPUT);

  pinMode(leftSensor, INPUT);
  pinMode(rightSensor, INPUT);

  pinMode(ledHeart, OUTPUT);


  digitalWrite(ledHeart, LOW);
  
  
  myState = START;  // Initial State  

  
}


void loop() {
  //Serial.println(rightSensorVal);


  int leftSensorVal = analogRead(leftSensor);
  int rightSensorVal = analogRead(rightSensor);

  Serial.println(leftSensorVal);

  switch (myState) {

    case START:
      Serial.println("Enter START state");
      delay(10);
      myState = FORWARD;
      break;

    case FORWARD:
      //Serial.println("Enter FORWARD state");
      //Serial.println("Move Forward");  // action
      //Serial.println(rightSensorVal);

      if (leftSensorVal < 7) {
        myState = LEFT;
      } else {
        ForwardDrive();
      }

      if (rightSensorVal < 7) {
        myState = RIGHT;
      } else {
        ForwardDrive();
      }


      break;

    case LEFT:
      Serial.println("Enter LEFT state");
      Serial.println("Move Left");  // action

      LeftDrive();

      myState = FORWARD;
      break;

    case RIGHT:
      Serial.println("Enter RIGHT state");
      Serial.println("Move right");  // action

      RightDrive();

      myState = FORWARD;
      break;


  }
}

void ForwardDrive() {
  analogWrite(MOTOR_PIN_A, wheelSpeed);
  analogWrite(MOTOR_PIN_B, LOW);
  analogWrite(MOTOR_PIN_C, wheelSpeed);
  analogWrite(MOTOR_PIN_D, LOW);
  digitalWrite(ledHeart, HIGH);
}

void LeftDrive() {
  analogWrite(MOTOR_PIN_A, LOW);
  analogWrite(MOTOR_PIN_B, 120);
  analogWrite(MOTOR_PIN_C, 120);
  analogWrite(MOTOR_PIN_D, LOW);
  digitalWrite(ledHeart, LOW);
  delay(100);
}

void RightDrive() {
  analogWrite(MOTOR_PIN_A, 120);
  analogWrite(MOTOR_PIN_B, LOW);
  analogWrite(MOTOR_PIN_C, LOW);
  analogWrite(MOTOR_PIN_D, 120);
  digitalWrite(ledHeart, LOW);
  delay(100);
}