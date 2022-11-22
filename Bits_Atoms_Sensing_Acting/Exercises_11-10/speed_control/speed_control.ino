#define wheelie 11
int speed = 0;


void setup() {
    Serial.begin(9600);
    pinMode(wheelie, OUTPUT);
    digitalWrite(wheelie, LOW);
    pinMode(A0, INPUT);
}

void loop() {
    int acquiredValue = analogRead(A0);
    int value = map(acquiredValue, 0, 1023, 0, 255);
    Serial.println(value);
    analogWrite(11, value);

    
}
