const Log = require("../model/Log");
const { ProtocolParser } = require("complete-teltonika-parser");
const { parserJT, parserJTLock } = require("../util/parserJT");
const { MqttConnect } = require("../rabbit/recieveTopic");

const logJT = async (protocol, imei, data, events) => {
  try {
    if (data.substring(0, 2) == 24) {
      const parsed = parserJT(data);
      MqttConnect(imei, "jt", parsed);
    } else if (data.substring(0, 2) == 28) {
      const parsed = parserJTLock(data);
      MqttConnect(imei, "jt", parsed);
    }
    await Log.create({ protocol, imei, data, events });
  } catch (err) {}
};

const logTelto = async (protocol, imei, data, events) => {
  try {
    const parsed = new ProtocolParser(data);
    const listLog = [];
    if (parsed.CodecType == "data sending") {
      parsed.Content.AVL_Datas.map((ele) => {
        listLog.push({
          latitude: ele.GPSelement.Latitude,
          longitude: ele.GPSelement.Longitude,
          speed: ele.GPSelement.Speed,
          satelites: ele.GPSelement.Satelites,
          ioElement: ele.IOelement.Elements,
        });
        console.log(ele.GPSelement.Latitude, ele.GPSelement.Longitude, ele.GPSelement.Speed, ele.GPSelement.Satelites);
      });
      MqttConnect(imei, "telto", listLog, parsed);
    } else {
    }

    await Log.create({ protocol, imei, data, events });
  } catch (err) {}
};

module.exports = {
  logJT,
  logTelto,
};
