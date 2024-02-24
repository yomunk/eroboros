#include <Adafruit_CircuitPlayground.h>
#include <PulseSensorPlayground.h>  // Includes the PulseSensorPlayground Library.

//  Variables
const int PulseWire = A1;      // PulseSensor PURPLE WIRE connected to ANALOG PIN 0
const int LED = 13;  // The on-board Arduino LED, close to PIN 13.
int Threshold = 550;          // Determine which Signal to "count as a beat" and which to ignore.
                              // Use the "Gettting Started Project" to fine-tune Threshold Value beyond default setting.
                              // Otherwise leave the default "550" value.

PulseSensorPlayground pulseSensor;  // Creates an instance of the PulseSensorPlayground object called "pulseSensor"


float value;

void setup() {
  Serial.begin(9600);
  CircuitPlayground.begin();

  // Configure the PulseSensor object, by assigning our variables to it.
  pulseSensor.analogInput(PulseWire);
  pulseSensor.blinkOnPulse(LED);  //auto-magically blink Arduino's LED with heartbeat.
  pulseSensor.setThreshold(Threshold);

  // Double-check the "pulseSensor" object was created and "began" seeing a signal.
  if (pulseSensor.begin()) {
    Serial.println("We created a pulseSensor Object !");  //This prints one time at Arduino power-up,  or on Arduino reset.
  }
}

void loop() {
  // Take 10 milliseconds of sound data to calculate
  value = CircuitPlayground.mic.soundPressureLevel(10);
  int myBPM = pulseSensor.getBeatsPerMinute(); 


  // Serial.print("Sound Sensor SPL: ");
  Serial.println("/spl " + String(value));
  Serial.println("/bpm "+ String(myBPM));


  delay(90);
}