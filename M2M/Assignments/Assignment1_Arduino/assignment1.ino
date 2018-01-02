/**
 * This is my home made alarm equipped with a magnet sensor 
 * and a speaker for sounding the alarm and two - 
 * LEDs for a visual status of red (Alarm) and green for (OK).
 * 
 * @author Robert M Molin 
 * version: 2017.10.02
 */


// Digital Pins on Arduino
const int buzzer = 3; //Speaker
const int AlarmSensor = 4; //Magnet sensor
const int redLedPin = 9;
const int greenLedPin = 10;

// Fields
int state; // The state of the magnet sensor is either 1 == Alarm! or 0 == OK! 
int alarmRedLed;
int greenLed;


 /* initialize digital pins AlarmSensor, redLedPin, greenLedPin as outputs.*/
void setup()
{
  pinMode(AlarmSensor, INPUT_PULLUP); 
  pinMode(redLedPin, OUTPUT); 
  pinMode(greenLedPin, OUTPUT);
}

/**
 * If the magnet sensor's state is true (open) the speaker alarm goes off and LED turns red!
 * else if the state is false (closed) the green LED stays green. 
 */  
void loop()
{
  state = digitalRead(AlarmSensor);
  alarmRedLed = digitalRead(redLedPin);

  //Alarm triggered
  if (state == HIGH){
    tone(buzzer, 400);
    digitalWrite(greenLedPin, LOW); //turn the green LED OFF! 
    digitalWrite(redLedPin, HIGH); //turn the red LED ON!
    delay(500);               
    digitalWrite(redLedPin, LOW); //turn the red LED off 
  }
  else{
    //Status OK, no alarm
    noTone(buzzer);
    digitalWrite(greenLedPin, HIGH); //turn the green LED ON!
  }
  delay(300);
}
