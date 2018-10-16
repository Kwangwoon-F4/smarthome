#include <UbidotsArduino.h>
#include <SPI.h>
#include <WiFi.h>

#define TOKEN  "BBFF-GfqBNxadAnLhwdTjCV0frdTPKwnnK6"

#define USER_STATUS_ID  "5bb0c1271d847269a7b66378"
#define LIGHT_ID  "5bbc4d011d84724b16ba3d3c"
#define TEMPERATURE_ID  "5bbafddd1d84727a9bcccfbd"
#define HUMIDITY_ID "5bbafde41d84727a59c5d667"
#define RAINDROP_ID "5bbc4cf91d84724b16ba3d2e"
#define USER_NAME_ID "5bc2aba51d847271c8bac044"

char ssid[] = "olleh_WiFi_64D9";   //  network SSID
char pass[] = "0000009684";       //  network password

int status = WL_IDLE_STATUS;

Ubidots client(TOKEN);

void setup(){
    Serial.begin(9600);
    while (!Serial) {
        ; // wait for serial port to connect. Needed for native USB port only
    }

    // check for the presence of the shield:
    if (WiFi.status() == WL_NO_SHIELD) {
        Serial.println("WiFi shield not present");
        // don't continue:
        while (true);
    }

    String fv = WiFi.firmwareVersion();
    if (fv != "1.1.0") {
        Serial.println("Please upgrade the firmware");
    }

    // attempt to connect to Wifi network:
    while (status != WL_CONNECTED) {
        Serial.print("Attempting to connect to SSID: ");
        Serial.println(ssid);
        // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
        status = WiFi.begin(ssid, pass);

        // wait 10 seconds for connection:
        delay(10000);
    }

}
void loop(){
  
        //String user_status_str = client.getValue(USER_STATUS_ID);
        String user_status_context = client.getContext(USER_NAME_ID);
  /*
        String light_str = client.getValue(LIGHT_ID);
        String temperature_str = client.getValue(TEMPERATURE_ID);
        String humidity_str = client.getValue(HUMIDITY_ID);
        String raindrop_str = client.getValue(RAINDROP_ID);
    */    
        //Serial.println("user status : " + user_status_str);
        Serial.println("user context : " + user_status_context);
    /*
        Serial.println("light value : " + light_str);
        Serial.println("temperature value : " + temperature_str);
        Serial.println("humidity value : " + humidity_str);
        Serial.println("raindrop value : " + raindrop_str);
        */
}
