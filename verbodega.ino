#include <WiFi.h>
#include <DHT.h>
#include <AWS_IOT.h>
#include <MQ2.h>



#define DHT_PIN 33
#define DHT_TYPE DHT11

#define WIFI_SSID "CLARO1_C70990"
#define WIFI_PASS "87654321"

#define CLIENT_ID "VerBodega_Demo"
#define MQTT_TOPIC "outTopic"
#define AWS_HOST "ab5ui7lagpdlp-ats.iot.us-east-2.amazonaws.com"

DHT dht(DHT_PIN, DHT_TYPE);
MQ2 mq2(32);
AWS_IOT aws;

int lpg, co, smoke;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial.print("\n Inicializando AWS_THING VerBodega_Test \n");

  Serial.print("\n Conectando WIFI a:");
  Serial.print(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("  ");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.print("\n Dispositivo Conectado!!!\n");
  Serial.println("Incializando DH11");
  dht.begin();
  mq2.begin();
  Serial.println("DH11 Inicializado!!!");

  Serial.println("Conectando Dispositivo a AWS! o:");
  if (aws.connect(AWS_HOST, CLIENT_ID) == 0) {
    Serial.println("Conectado a AWS! :) ");
  } else {
    Serial.println("Fallo la conexión a AWS! ):");
  }

}

void loop() {
  // put your main code here, to run repeatedly:
  float temperatura = dht.readTemperature();
  float humedad = dht.readHumidity();
  float* values = mq2.read(true);
  lpg = mq2.readLPG();
  co = mq2.readCO();
  smoke = mq2.readSmoke();


  if (temperatura == NAN || humedad == NAN) {
    Serial.println("Fallo la lectura de datos");
  } else {
    String mess = "{ \"Temperatura\": \"";
    mess += String((int)temperatura);
    mess += "\" ,\"Humedad\": \"";
    mess += String((int)humedad);
    mess += "\" ,\"CO2\": \"";
    mess += String(values[1]);
    mess += "\" ,\"Smoke\": \"";
    mess += String(values[2]);
    mess += "\" ,\"LPG\": \"";
    mess += String(values[0]);
    mess += "\" ,\"Dispositivo\": \"";
    mess +="VerBodega_1";
    mess += "\"}";

    char payload[140];
    mess.toCharArray(payload, 140);
    Serial.println("Publicando Mensaje!!! ~ ");
    Serial.println(payload);
    if (aws.publish(MQTT_TOPIC, payload) == 0) {
      Serial.println("Mensaje enviado exitosamente!!");
    } else {
      Serial.println("Se fallo enviando el mensaje ):");
    }
  }

  delay(120000);
}