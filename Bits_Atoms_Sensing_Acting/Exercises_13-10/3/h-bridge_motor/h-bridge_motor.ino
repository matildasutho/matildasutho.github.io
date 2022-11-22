#define MOTOR_PIN_A 5
#define MOTOR_PIN_B 6
int button = 7;
bool buttonState = 0;

void setup() 
{
  Serial.begin(9600);
  pinMode(MOTOR_PIN_A, OUTPUT);
  pinMode(MOTOR_PIN_B, OUTPUT);
  pinMode(7, INPUT);
}
void loop() 
{


  if (digitalRead(button)==HIGH) {
    while (digitalRead(button)==HIGH) {

    }
    if (buttonState==0) {
      buttonState=1;
    digitalWrite(MOTOR_PIN_A, HIGH);
    digitalWrite(MOTOR_PIN_B, LOW);
    }
    else  {
      buttonState=0;
    digitalWrite(MOTOR_PIN_A, LOW);
    digitalWrite(MOTOR_PIN_B, HIGH);
    }

  }
  Serial.println(buttonState);

  

  
  //The other direction


}
