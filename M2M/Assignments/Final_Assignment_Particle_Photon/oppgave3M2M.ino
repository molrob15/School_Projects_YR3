/**
 * This security prototype app uses a PIR sensor to detect movement in a room
 * and a magnet sensor for controlling a door entrance for activity.
 * From the mobile application made with Blynk, the sensor data can be monitored
 * with time and with instant notification when a change is detected.
 *
 * version: 2017.11.29
 * @author Robert Mattias Molin
 *
 * Inspired by author Ingo Lohs, project can be found at:
 * https://particle.hackster.io/ingo-lohs/mypir-sensor-informs-me-via-ifttt-e8b628
 *
 * And author "Bianchi Rider", project can be found at:
 * https://particle.hackster.io/BianchiRider/garage-door-opener-with-blynk-a0530d
 */


#include <blynk.h>
#define BLYNK_PRINT Serial
#define ONE_DAY_MILLIS (24 * 60 * 60 * 1000)


char auth[] = "YourAuthToken"; // Connect code to the Blynk app

BlynkTimer timer;
unsigned long lastSync = millis(); // For time synchronization from the Particle Cloud

//Magnet Sensor, "Door sensor"
int DoorLocation;  // Door location for history graph (Blynk app)
double CountOpen;  // Counter to prevent overwrite
double CountClose;  // Counter to prevent overwrite
double TimerStuck;  // Counter for door stuck in between "positions"

const int magnetSensor = D3;
int state; // The state of the magnet sensor is either 1 == Alarm! or 0 == OK!
String DoorStatus; //For blynk app
WidgetTerminal terminal(V10);  // Blynk Terminal


//PIR Sensor
const int inputPin = D0;  // choose the input pin (for PIR sensor)
String Movement; //For blynk app

int pirState = LOW;  // we start, assuming no motion detected
int val = 0;  // variable for reading the pin status
int boardLed = D7;// photon onBoard LED
int ledPin = D1;  // LED Pin
int PirStatus;  // for history graph in Blynk app

int calibrateTime = 10000;      // wait for the thingy to calibrate

unsigned long delay_60s = 0;//To prevent sending data that exceeds the 60000 millis() limit to Azure IoT Hub



void setup()
{
    Serial.begin(9600);
    Blynk.begin(auth);

    timer.setInterval(1000, sendStatus);  // Send data to Blynk once a second
    timer.setInterval(60000, sendAtm);  // Send data to Blynk once a minute

    pinMode( magnetSensor, INPUT_PULLUP );

    pinMode(boardLed, OUTPUT);    // on-board LED
    pinMode(ledPin, OUTPUT); //led PIR sensor
    pinMode(inputPin, INPUT);     // declare PIR sensor as input

    digitalWrite(boardLed, HIGH);
    Particle.publish("SecureM2M", "now online", 100, PRIVATE);//Publish project status in Prticle Console
    digitalWrite(boardLed, LOW);

    Particle.syncTime();  // Request time synchronization from the Particle Cloud (UTC)
    Time.zone(+1);  // Set to correct time zone

}


//  Get terminal data if Photon is rebooted
BLYNK_CONNECTED()
{
    Blynk.syncVirtual(V10);
}


/**
 * Send data to Blynk once every minute
 * to sync the app terminal and update time and date.
 */
void sendAtm()
{

    Blynk.syncVirtual(V10);  // Sync terminal. Tends to not update if app is running on phone
    terminal.flush();

    // Sync time once a day
    if (millis() - lastSync > ONE_DAY_MILLIS)
    {
        terminal.println( Time.format( Time.now(), "%m.%d.%y %I:%M:%S %p Current Time") );
        Particle.syncTime();  // Request time synchronization from the Particle Cloud
        lastSync = millis();
        Time.zone(+1);  // Set correct time zone
        terminal.println(Time.format(Time.now(), "%m.%d.%y %I:%M:%S %p Updated Time"));
        terminal.flush();
    }
}


//Sends data to Blynk mobile app, once every second
void sendStatus()
{
    Blynk.virtualWrite(V3, DoorLocation);
    Blynk.virtualWrite(V5, DoorStatus);
    Blynk.virtualWrite(V4, PirStatus);
    Blynk.virtualWrite(V1, Movement);
}


//PIR Sensor functions
void readTheSensor()
{
    val = digitalRead( inputPin );
}


bool calibrated()
{
    return millis() - calibrateTime > 0;
}


void determineMotion()
{
    // if the pir sensor reads high, or if motion is detected
    if (val == HIGH)
    {
        // the current state is no motion
        // i.e. it's just changed
        // announce this change by publishing an event
        if (pirState == LOW && (millis() - delay_60s >= 60000))
        {
            delay_60s = millis();
            Movement = "Movement Detected!"; //Change label in Blynk app
            //Fill in email details below to activate email notification via Blynk
            Blynk.email("my_email@example.com", "Subject", "Your message goes here");
            PirStatus = 100; //for history graph on app

            pirState = HIGH;
            setLED( pirState );

             // Get some data
            char data[64];
            sprintf(data, "%0d.%d", val); //Print int value (val) as a char sequence.
            // Trigger the integration
            Particle.publish("motionDetected", data, PRIVATE);
        }
    }
    else
    {
        if (pirState == HIGH)
        {
            Movement = "200 OK";
            PirStatus = 0;
            /**
              We have just turned off,
              update the current state
             */
            pirState = LOW;
            setLED( pirState );
        }
    }
}


void setLED( int pirState )
{
  digitalWrite( ledPin, pirState );
  delay(3000);
}
//PIR functions end


//Main loop
void loop()
{
    Blynk.run();
    timer.run();

    state = digitalRead( magnetSensor );

    // Check door for closed status
    if ( state == LOW )
    {
      DoorStatus = "Door Closed"; // V5
      TimerStuck = millis();
      DoorLocation = 0;

        if (CountClose < 1)
        {
            terminal.println(Time.format(Time.now(), "%m.%d %I:%M %p Closed"));
            terminal.flush();
            CountClose = 1;  // Prevent overwrite of time closed while closed
            CountOpen = 0;  // Allow overwrite of time opened
        }

    }

    // Check door for open status
    if ( state == HIGH && (millis() - delay_60s >= 60000))
    {
        delay_60s = millis();
        DoorStatus = "Door Open";  // V5
        TimerStuck = millis();
        DoorLocation = 100;
        Blynk.notify("Alarm! The door is open, possible break in attempt!"); //Send notification to phone

        if (CountOpen < 1)
        {
            terminal.println(Time.format(Time.now(), "%m.%d %I:%M %p Open"));
            terminal.flush();
            CountOpen = 1;
            CountClose = 0;
        }

         // Get some data
        char data[64];
        sprintf(data, "%0d.%d", state); //Print int value (state) as a char sequence.
        // Trigger the integration
        Particle.publish("doorStatus", data, PRIVATE);
    }

    // if the PIR sensor is calibrated
    if ( calibrated() )
    {
        // get the data from the PIR sensor
        readTheSensor();
        // report it out, if the state has changed
        determineMotion();
    }
    delay(300);
}//end loop
