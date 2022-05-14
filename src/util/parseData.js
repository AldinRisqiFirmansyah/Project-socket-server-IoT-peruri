const parsingData = (data) => {
    const dataObject = {
        DeviceId: "",
        ProtocolHead: "",
        ProtocolVersion: "",
        DeviceType: "",
        DataType: "",
        DataLength: "",
        SDate: "",
        STime: "",
        SLongtitude: "",
        SLatitude: "",
        LocationIndicator: "",
        Direction: "",
        QualityOfGps: "",
        VehicleId: "",
        DeviceStatus: "",
        Milage: "",
        BatteryPercentage: "",
        CellId: "",
        GsmSignal: "",
        GeoFence: "",
        reserve: "",
        SerialNumber: "",
        Speed: "",
    };

    let CurrIdx = 0;
    const list = data.split(",");
    dataObject.ProtocolHead = list[0];
    CurrIdx += 2;

    dataObject.DeviceId = list[1];
    CurrIdx += 10;

    dataObject.ProtocolVersion = list[2];
    CurrIdx += 2;

    dataObject.DeviceType = list[3];
    CurrIdx += 1;

    dataObject.DeviceId = list[4];
    CurrIdx += 10;

    dataObject.DataType = list[5];
    CurrIdx += 10;

    dataObject.DataLength = list[6];
    CurrIdx += 4;

    dataObject.DeviceId = list[7];
    CurrIdx += 10;

    dataObject.SDate = list[8];
    CurrIdx += 6;

    dataObject.STime = list[9];
    CurrIdx += 6;

    dataObject.DeviceId = list[10];
    CurrIdx += 10;

    dataObject.SLatitude = list[11];
    CurrIdx += 8;

    dataObject.DeviceId = list[12];
    CurrIdx += 10;

    dataObject.SLatitude = list[13];
    CurrIdx += 9;

    dataObject.LocationIndicator = list[14];
    CurrIdx += 1;

    dataObject.DeviceId = list[15];
    CurrIdx += 10;

    dataObject.Speed = list[16];
    CurrIdx += 2;

    dataObject.Direction = list[17];
    CurrIdx += 2;

    dataObject.Milage = list[18];
    CurrIdx += 8;

    dataObject.QualityOfGps = list[19];
    CurrIdx += 2;

    dataObject.DeviceId = list[20];
    CurrIdx += 10;

    dataObject.VehicleId = list[21];
    CurrIdx += 8;

    dataObject.DeviceStatus = list[22];
    CurrIdx += 4;

    dataObject.BatteryPercentage = list[23];
    CurrIdx += 2;

    dataObject.CellId = list[24];
    CurrIdx += 8;

    dataObject.GsmSignal = list[25];
    CurrIdx += 2;

    dataObject.GeoFence = list[26];
    CurrIdx += 2;
    return dataObject;
};

module.exports = {
    parsingData,
};
