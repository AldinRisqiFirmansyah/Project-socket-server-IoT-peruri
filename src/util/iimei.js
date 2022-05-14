const Imei = require("../model/Imei");

const createNewImei = async (imei) => {
    try {
        const imeiExist = await Imei.findOne({ where: { imei } });
        if (imeiExist) {
        } else {
            await Imei.create({ imei });
        }
    } catch (err) {
    }
};

const updateConn = async (device, imei) => {
    try {
        const connExist = await Imei.findOne({ where: { device } });
        if (connExist) {
            if (imei.length == 15 || imei.length == 10) {
                await Imei.update({ imei }, { where: { device } });
            } else {
            }
        } else {
        }
    } catch (err) {
    }
};

module.exports = {
    createNewImei,
    updateConn,
};
