const Connection = require("../model/Connection");

const createNewConnection = async (no = "") => {
    try {
        const connectionExist = await Connection.findOne({ where: { no } });
        if (connectionExist) {
        } else {
            await Connection.create({ no });
        }
    } catch (err) {
    }
};

const updateImeiConnection = async (no, imei) => {
    try {
        const connectionExist = await Connection.findOne({ where: { no } });
        if (connectionExist) {
            if (imei.length == 15 || imei.length == 10) {
                await Connection.update({ imei }, { where: { no } });
            } else {
            }
        } else {
        }
    } catch (err) {
    }
};
const getImeiConnection = async (no) => {
    try {
        const result = await Connection.findOne({ where: { no } });
        return result ? result.imei : "";
    } catch (err) {
    }
};

module.exports = {
    createNewConnection,
    updateImeiConnection,
    getImeiConnection,
};
