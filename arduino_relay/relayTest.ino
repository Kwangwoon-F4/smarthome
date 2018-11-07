#define Air_conditioner 2 //에어컨
#define Humidifier 7 //가습기
#define Air_purifier 12 //공기청정기

void setup(){
  pinMode(Air_conditioner, OUTPUT);
  pinMode(Humidifier, OUTPUT);
  pinMode(Air_purifier, OUTPUT);
  
  digitalWrite(Air_conditioner, HIGH);
  digitalWrite(Humidifier, HIGH);
  digitalWrite(Air_purifier, HIGH);
}
void loop(){
  if(isTrue()){
    swith_Air_conditioner();
  }
  
  //swith_Humidifier();
  //swith_Air_purifier;
  
}

void swith_Air_conditioner(){
  delay(3000);
  digitalWrite(Air_conditioner, LOW);
  delay(3000);
  digitalWrite(Air_conditioner, HIGH);
}
void swith_Humidifier(){
  delay(3000);
  digitalWrite(Humidifier, LOW);
  delay(3000);
  digitalWrite(Humidifier, HIGH);
  
}
void swith_Air_purifier(){
  delay(3000);
  digitalWrite(Air_purifier, LOW);
  delay(3000);
  digitalWrite(Air_purifier, HIGH);
  
}
bool isTrue(){
  return true;
}

