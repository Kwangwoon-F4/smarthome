
#include <UbidotsArduino.h>
#include <SPI.h>
#include <WiFi.h>

#define TOKEN  "BBFF-GfqBNxadAnLhwdTjCV0frdTPKwnnK6"
#define USER_STATUS_ID  "5bb0c1271d847269a7b66378"
//#define MultiTab_ID ""

#define LIGHT_ID  "5bbc4d011d84724b16ba3d3c"
#define TEMPERATURE_ID  "5bbafddd1d84727a9bcccfbd"
#define HUMIDITY_ID "5bbafde41d84727a59c5d667"
#define RAINDROP_ID "5bbc4cf91d84724b16ba3d2e"
#define USER_NAME_ID "5bc2aba51d847271c8bac044"

 
#define uLIGHT_ID  "5bceed1c1d84725599d4ba29"
#define uTEMPERATURE_ID  "5bceedab1d847256d1909349"
#define uHUMIDITY_ID  "5bceedb71d847256f30adc5f"
#define uRAINDROP_ID  "5bceee041d847256b8f828d9"
#define USER_ID "5bd05ecf1d84725bca494a79"

//#define MultiTab 1
#define Light 2 //에어컨
#define Air_conditioner 4 //가습기
#define Humidifier 5 //공기청정기


char ssid[] = "이동호";   //  network SSID
char pass[] = "9304291244718";       //  network password

int status = WL_IDLE_STATUS;

Ubidots client(TOKEN);

char reply[15];

String raw;

uint8_t bodyPosinit, bodyPosend;

float userID = 100; //유저 구별하기 위한 변수 
float current_multitab = 0;// 멀티탭을 위한 변수니까 전역변수로
// ubidots 에서 들어오는 전원을 제어할때 들어오는 데이터는 0,1이다. 
// 전원 꺼짐 버튼을 누르게 되면 userID=100, on/off value는 1,2
// 임의의 유저의 아이디는 0이다. 이것은 개별적인 데이터를 가지고 온다. 
// 따라서 웹에서 모든 전원을 off하게 되면, userID = 100, current_multitab = 2;
// 임의의 사용자가 들어올 경우엔 userID = 0;
// 등록된 사용자들은 userID =1,2,3,4,5~~
 

// 처음 상태는 아무것도 켜져있지 않는 상태가 된다. ubidots에서 사용자에 대한 데이터를 받아오면
// 그때부터 제어가 시작된다.

// UbidotsUserID

void setup(){
    
    Serial.begin(115200);
    
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

    Serial.println("WIFI setup end");

    //pinMode(MultiTab, OUTPUT);
    pinMode(Light, OUTPUT);
    pinMode(Air_conditioner, OUTPUT);
    pinMode(Humidifier, OUTPUT);

    //digitalWrite(MultiTab,LOW);
    digitalWrite(Light, HIGH);
    digitalWrite(Air_conditioner, HIGH);
    digitalWrite(Humidifier, HIGH);

    Serial.println("PIN setup end");
}

void loop(){  

                
        String multitab_str = client.getValue(MultiTab_ID);
        String light_str = client.getValue(LIGHT_ID);
        String temperature_str = client.getValue(TEMPERATURE_ID);
        String humidity_str = client.getValue(HUMIDITY_ID);
        String ubidotsID_str = client.getValue(USER_ID);
        
        current_multitab = multitab_str.toFloat();
        
        float current_light = light_str.toFloat();
        float current_temperature = temperature_str.toFloat();
        float current_humidity = humidity_str.toFloat();

        float UbidotsUserID = ubidotsID_str.toFloat();
        
        Serial.println("multitab status : " + multitab_str);
        Serial.println("sensor light value : " + light_str);
        Serial.println("sensor temperature value : " + temperature_str);
        Serial.println("sensor humidity value : " + humidity_str);

        
        Serial.println("user current ID : " + userID);
        Serial.println("user with Ubdots  ID : " + ubidotsID_str);

        
        // ubidots에서 받아온 값   
        
        // 유비도츠에서 사용자의 아이디를 받아온것을 플로트 형으로 만든다. 

        Serial.println("user current ID : " + UbidotsUserID);
        // 루프안에서 계속돌아가는 중이니까 처음에 아이디만 0 이후에는 데이터를 받아온다. 
        
        // 만약에 유비도츠 데이터를 바꿀 수있다면, 
        
        
        // 멀티탭의 데이터는 초기상태가 다른 값을 갖는다.
        // 1또는 2의 데이터가 들어올 경우에 멀티탭을 제어한다. 
        if (current_multitab == 2){
            // 사용자의 데이터가 2이 들어온다면 멀티탭을 꺼준다.
            Serial.println("MultiTab OFF");
            delay(1000);
            setUserID (100);
            //유비도츠의 ID도 100으로 초기화 시켜준다..
            digitalWrite(MultiTab,HIGH);    
        } else if(current_multitab == 1){
            // 사용자의 데이터가 1이 들어온다면 멀티탭을 켜준다.
            Serial.println("MultiTab ON");
            delay(1000);
            digitalWrite(MultiTab,LOW);
        } else {
            Serial.println("MultiTab data NULL");
    }     
    
    // 조건문은 들어오는 값이 아이디가 변경되었을 경우에만, 조건문이 실행이 되는 것이다. 
  
   if(UbidotsUserID != userID){

        // 초기 userID 값은 float 형으로 0이다. 
        // 따라서 초기의 userID는 0이고 temp에는 loop 문안에서 데이터가 현재 사용자의 아이디 값을 받아오기때문에 다르기 때문에 실행이된다.  
        
        //유저가 달라진다는 새로운 유저가 들어온다라고 인식한다. 
        if(current_multitab == 2){
            // 기본에 멀티탭에 대한 데이터가 2이라서 꺼져있는 상태면,
            // 멀티탭을 다시 켜준다. 
            setMultiTabID(1);
            Serial.println("MultiTab ON");
            delay(1000);
            digitalWrite(MultiTab,LOW);
        }
        // 사용자가 다시들어오는 경우는?
        
        Serial.println("user changed");
        
        setUserID (UbidotsUserID);
        // 전역변수 userID의 값은 UbidotsUserID 으로 변경된다. 
       
        Serial.print("user after ID : " + userID);
                
        delay(2000);
        
        Serial.println("after delay 2000");
        
        // user가 바뀌었으면 사용자의 초기리셋으로 모든 기기의 전원을 차단한다. 
        digitalWrite(Light, HIGH);
        digitalWrite(Air_conditioner, HIGH);
        digitalWrite(Humidifier, HIGH);

        // 해당유저의 데이터를 다 모아온다. 
        String ulight_str = client.getValue(uLIGHT_ID);
        String utemperature_str = client.getValue(uTEMPERATURE_ID);
        String uhumidity_str = client.getValue(uHUMIDITY_ID);
        
        // 해당 데이터들을 모두 float 형으로 형변환을 해준다. 
        float user_light = ulight_str.toFloat();
        float user_temperature = utemperature_str.toFloat();
        float user_humidity = uhumidity_str.toFloat();


        // 유저의 원하는 데이터의 값을 출력한다. 
        Serial.println("usensor light value : " + ulight_str);
        Serial.println("usensor temperature value : " + utemperature_str);
        Serial.println("usensor humidity value : " + uhumidity_str);
          
        // 그 데이터를 각각 제어하는 함수에 넣는다. 
        control_Light(user_light);
        control_Airconditioner(current_temperature, user_temperature);
        control_Humidifier(current_humidity, user_humidity);
   } 
   else if(UbidotsUserID == 100){
        Serial.println("No User Input");
        delay(1000);
        digitalWrite(Light, HIGH);
        digitalWrite(Air_conditioner, HIGH);
        digitalWrite(Humidifier, HIGH);
   }        
   
   else { Serial.println("user not changed"); }
}

void control_Light(float user_light){
    
    //유저의 원하는 조도값이 들어온다. 
    if(user_light = 1){
        //1일때만 불을 켜준다. 
        delay(1000);
        digitalWrite(Light, HIGH);
        Serial.println("light OFF");
    } else{

        delay(1000);
        digitalWrite(Light, LOW);
        Serial.println("light ON");
    }
    
}

//내부 함수를 효율적 구현이 필요하다. 
void control_Airconditioner(float c_temperature, float user_temperature){
    
    //현재 기온이 유저가 설정한 기온보다 높은 경우에만 에어컨을 틀어준다. 
    
    if(c_temperature > user_temperature){
        delay(1000);
        Serial.println("aircon ON");
        digitalWrite(Air_conditioner, LOW);
    } else {
        delay(1000);
        Serial.println("aircon OFF");
        digitalWrite(Air_conditioner, HIGH);
    }
}
void control_Humidifier(float c_humidity, float user_humidity){
    
    if(user_humidity == 1 ){
       delay(1000);
       digitalWrite(Humidifier, HIGH);
        
    } else if(user_humidity == 2) {
        if(c_humidity < 25){
            delay(1000);
            Serial.println("gas on");
            digitalWrite(Humidifier, LOW);
        }else{
            delay(1000);
            digitalWrite(Humidifier, HIGH);
            Serial.println("gas off");
        }
    
    } else if(user_humidity == 3) {
         delay(1000);
         Serial.println("gas 3 on");
         digitalWrite(Humidifier, LOW);
       
    }
}

void setUserID (float value_ID) {
    
    userID = value_ID;
}
void setMultiTabID(float multi_ID){
    current_multitab = multi_ID;
}