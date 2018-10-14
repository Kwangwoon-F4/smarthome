#include <UbidotsArduino.h>

#include <SPI.h>
#include <WiFi.h>
#define ID  "5bb0c1271d847269a7b66378"
#define TOKEN  "BBFF-GfqBNxadAnLhwdTjCV0frdTPKwnnK6"

char ssid[] = "olleh_WiFi_64D9";    // your network SSID (name)
char pass[] = "0000009684"; // your network password
int keyIndex = 0;               // your network key Index number (needed only for WEP)

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
        String str = client.getValue(ID);
        Serial.println(str);

        //str 사용해서 아두이노 조작하면 되지 1.0 0.0
        
        //Serial.print("value : ");
        //Serial.println(value);
}
