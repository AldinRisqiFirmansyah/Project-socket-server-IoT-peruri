const { DataTypes, Model } = require("sequelize");

const pa_db = require("../database/pa_db");

class Imei extends Model { }

Imei.init(
    {
        device: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imei: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: pa_db,
        modelName: "Imei",
        timestamps: true,
    }
);

module.exports = Imei;
