#!/usr/bin/env node

const amqp = require("amqplib/callback_api");
const mqtt = require("mqtt");

function MqttConnect(imei, protocol, data) {
    const opt = {
        serverUrl: "",  //use cumulocity 
        tenant: "",      //  ...........
        username: "",      // IoT platform
        password: "",       // ...........
        clientId: `${imei}`,    //  to view this app
    };
    const clientMqtt = mqtt.connect(opt.serverUrl, {
        username: `${opt.tenant}/${opt.username}`,
        password: opt.password,
        clientId: opt.clientId,
    });
    clientMqtt.on("connect", function () {
        clientMqtt.publish("s/us", "100," + protocol + imei + ",c8y_MQTTDevice");
        clientMqtt.subscribe("s/ds");

        // receive data from Gps Tracker
        if (protocol == "telto") {
            data.map((ele) => {
                clientMqtt.publish(`s/us`, `112,${ele.latitude},${ele.longitude}`);
                clientMqtt.publish(`s/us`, `401,${ele.latitude},${ele.longitude}`);
                clientMqtt.publish(`s/us`, `402,${ele.latitude},${ele.longitude},${ele.altitude}`);
                clientMqtt.publish(`s/us`, `200,monitor_speed,KMperHour,${ele.speed},kph`);
                clientMqtt.publish(`s/us`, `200,TotalOdometer,total,${ele.ioElement['16']},m`);
                clientMqtt.publish(`s/us`, `200,Gsm,signal,${ele.ioElement['21']},dBm`);
                clientMqtt.publish(`s/us`, `200,movement,move,${ele.ioElement['240']},m`);
                clientMqtt.publish(`s/us`, `200,batteryVoltage,voltage,${ele.ioElement['67']},mV`);
                clientMqtt.publish(`s/us`, `200,batteryCurrent,current,${ele.ioElement['68']},mA`);
                clientMqtt.publish(`s/us`, `200,externalVoltage,voltage,${ele.ioElement['66']},mV`);
                clientMqtt.publish(`s/us`, `200,gnss,status,${ele.ioElement['69']},`);
                clientMqtt.publish(`s/us`, `200,GnssPdop,pdop,${ele.ioElement['181']},`);
                clientMqtt.publish(`s/us`, `200,GnssHdop,hdop,${ele.ioElement['182']},`);
                clientMqtt.publish(`s/us`, `200,active gsm,operator,${ele.ioElement['241']},m`);
                clientMqtt.publish(`s/us`, `200,sleep,mode,${ele.ioElement['200']},m`);
            });

            clientMqtt.end();

            // receive data from electronic padlock
        } else if (protocol == "jt") {
            clientMqtt.publish(`s/us`, `112,${data.latitude},${data.longitude}`);
            clientMqtt.publish(`s/us`, `401,${data.latitude},${data.longitude}`);
            clientMqtt.publish(`s/us`, `402,${data.latitude},${data.longitude}`);
            clientMqtt.publish(`s/us`, `200,monitor_speed,KMperHour,${data.speed},kph`);
            if (data.deviceStatus && data.deviceStatus.lowBatery == true) {
                clientMqtt.publish(`s/us`, `304,lowBattery`);
            }
            if (data.deviceStatus && data.deviceStatus.ropeCut == true) {
                clientMqtt.publish(`s/us`, `304,ropeCut`)
            }
            if (data.deviceStatus && data.deviceStatus.motorLock == true) {
                clientMqtt.publish(`s/us`, `200, motorLock,On/Off,${data.deviceStatus.motorLock}`)
            }

            // triggered alarm by event 
            if (data.alarm == 1) {
                clientMqtt.publish(`s/us`, `304,JT_unlocked with rfid`);
            } else if (data.alarm == 2) {
                clientMqtt.publish(`s/us`, `304,ilegal_RFID_card_tap_on`);
            } else if (data.alarm == 5) {
                clientMqtt.publish(`s/us`, `304,JT107_locked automatically`);
            }
            clientMqtt.end();
        }
    });
    clientMqtt.on("message", function (topic, message) {
        if (message.toString().indexOf("510") == 0) {
            clientMqtt.publish("s/us", "501,c8y_Restart");
            setTimeout(function () {
                clientMqtt.publish("s/us", "503,c8y_Restart");
            }, 1000);
        }
    });

    clientMqtt.on("error", () => {
    });
    clientMqtt.on("close", () => {
    });
}
module.exports = {
    MqttConnect,
};
