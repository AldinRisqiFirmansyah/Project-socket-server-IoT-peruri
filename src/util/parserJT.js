const parserJT = (data) => {
    const direction = () => {
        const binStr = parseInt(data.substring(49, 50), 16).toString(2);
        return {
            longitude: binStr[1] == 0 ? -1 : 1,
            latitude: binStr[2] == 0 ? -1 : 1,
            gps: binStr[3] == 0 ? "gps not positioning" : "gps positioning",
        };
    };
    const realLatitude = (lat) => {
        const dir = direction();
        const puluhan = parseInt(lat.substring(0, 2));
        const menit = parseInt(lat.substring(2, 8)) / 10000 / 60;
        return (puluhan + menit) * dir.latitude;
    };
    const realLongitude = (lat) => {
        const dir = direction();
        const ratusan = parseInt(lat.substring(0, 3));
        const menit = parseInt(lat.substring(3, 9)) / 10000 / 60;
        return (ratusan + menit) * dir.longitude;
    };
    const alarmID = (data) => {
        const byte2 = parseInt(data.substring(0, 2), 16);
        const byte1 = parseInt(data.substring(2, 4), 16);

        function byteString(n) {
            if (n < 0 || n > 255 || n % 1 !== 0) {
                throw new Error(n + " does not fit in a byte");
            }
            return ("000000000" + n.toString(2)).substr(-8);
        }
        const fullByte1 = byteString(byte1);
        const fullByte2 = byteString(byte2);
        const urutan = `${byteString(byte2)}${byteString(byte1)}`;
        return {
            reserved: "is empty",
            motorStuck: fullByte2[1] == 1 ? true : false,
            backCoverClosed: fullByte2[2] == 1 ? true : false,
            backCoverOpenedAlarm: fullByte2[3] == 1 ? true : false,
            lowBatery: fullByte2[4] == 1 ? true : false,
            ilegalRFID: fullByte2[5] == 1 ? true : false,
            wrongPassword: fullByte2[6] == 1 ? true : false,
            LongTimeUnloc: fullByte2[7] == 1 ? true : false,
            motorLock: fullByte1[0] == 1 ? true : false,
            ropeStateInserted: fullByte1[1] == 1 ? true : false,
            ropeCut: fullByte1[2] == 1 ? true : false,
        };
    };
    return {
        protokol: data.substring(0, 2),
        imei: data.substring(2, 12),
        protokolVersion: data.substring(12, 14),
        deviceType: data.substring(14, 15),
        dataType:
            data.substring(15, 16) == 1
                ? "realtime"
                : data.substring(15, 16) == 2
                    ? "alarmdata"
                    : "blind",
        dataLength: parseInt(data.substring(16, 20), 16),
        date: data.substring(20, 26),
        time: data.substring(26, 32),
        latitude: realLatitude(data.substring(32, 40)),
        longitude: realLongitude(data.substring(40, 49)),
        direction: data.substring(49, 50),
        speed: parseInt(data.substring(50, 52), 16) * 1.85,
        direction: parseInt(data.substring(52, 54), 16) * 2,
        millage: parseInt(data.substring(54, 62), 16),
        nGPSSatelit: parseInt(data.substring(62, 64), 16),
        bindVID: data.substring(64, 72),
        deviceStatus: alarmID(data.substring(72, 76)),
        batreLevel: parseInt(data.substring(76, 78), 16),
    };
};
const parserJTLock = (data) => {
    const arrayData = Buffer.from(data, "hex").toString("ascii").split(",");
    return {
        latitude: (arrayData[4] * arrayData[5] == "N" ? 1 : -1),
        longitude: (arrayData[6] * arrayData[7] == "E" ? 1 : -1),
        alarm: arrayData[11],
        speed: arrayData[9],
    };
};
module.exports = {
    parserJT,
    parserJTLock,
};
