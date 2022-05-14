const { DataTypes, Model } = require("sequelize");
const pa_db = require("../database/pa_db");

class Log extends Model { }

Log.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        protocol: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        events: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        imei: {
            type: DataTypes.STRING,
            allowNull: false,

        },
    },
    {
        sequelize: pa_db,
        modelName: "Log",
        timestamps: true,
    }
);

module.exports = Log;