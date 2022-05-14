const { parseIMEI, ProtocolParser } = require("complete-teltonika-parser");
const { crc16 } = require("easy-crc");
const { kirimTask } = require("../rabbit/sendRabbitmq");
const { logJT, logTelto } = require("./log");

const newClientConect = (client) => {
  let imeiNumber = "";
  const message = {
    protocol: "",
    events: "",
    data: "",
    imei: "",
  }

  client.on("data", (data) => {
    const hexdata = data.toString("hex");
    if (hexdata.substring(0, 2) == 00) {
      if (hexdata.substring(2, 4) != 00) {
        const asc = data.toString("hex");
        const imeiNumber = parseIMEI(asc);
        client.write(Buffer.from([1]));
        message.protocol = "telto";
        message.events = "imei";
        message.data = hexdata;
        message.imei = imeiNumber;
        kirimTask(JSON.stringify(message));
      } else {
        const dataLogTeltonika = data.toString("hex");
        const dataStreamTeltonika = Buffer.from(dataLogTeltonika.substring(16, dataLogTeltonika.length - 8), "hex");
        const sum = dataLogTeltonika.substring(dataLogTeltonika.length - 4);
        const isValid = parseInt(crc16("ARC", dataStreamTeltonika).toString(16), 16) == parseInt(sum, 16);
        const parsed = new ProtocolParser(dataLogTeltonika);

        if (isValid) {
          const parsed = new ProtocolParser(dataLogTeltonika);
          message.events = "log";
          message.data = hexdata;
          kirimTask(JSON.stringify(message));
          logTelto(message.protocol, message.imei, message.data, message.events);
          client.write(Buffer.from([0, 0, 0, `0x${dataLogTeltonika.substr(-10, 2)}`]));
        } else {
          message.events = "log";
          message.data = hexdata;
          kirimTask(JSON.stringify(message));
          client.write(Buffer.from([0, 0, 0, 0]));
        }
      }
    } else if (hexdata.substring(0, 2) == 24 || hexdata.substring(0, 2) == 28) {
      let asc = Buffer.from("(P35)", "ascii");
      const dataString = data.toString("hex");
      const dataLogString = data.toString("hex");
      if (data.byteLength == 16) {
        imeiNumber = data.toString("ascii").slice(1, 11);
        message.protocol = "jt"
        message.imei = imeiNumber;
        message.data = hexdata;
        message.events = "imei";
        kirimTask(JSON.stringify(message));
        client.write(Buffer.from("(P54,1)", "ascii"));
      } else {
        if (dataString.substring(0, 2) == "28") {
          message.protocol = "jt";
          message.imei = imeiNumber;
          message.data = hexdata;
          message.events = "log";
          kirimTask(JSON.stringify(message));
          logJT(message.protocol, message.imei, message.data, message.events);
          client.write(Buffer.from("(P46)", "ascii"));
        } else {
          message.protocol = "jt"
          message.imei = imeiNumber;
          message.data = hexdata;
          message.events = "log";
          kirimTask(JSON.stringify(message));
          logJT(message.protocol, message.imei, message.data, message.events);
          client.write(asc);
        }
      }
    } else {
      client.end();
    }
  });
  client.on("error", (err) => {
  });
};

module.exports = {
  newClientConect,
};
