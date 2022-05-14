const { DataTypes, Model } = require("sequelize");
const pa_db = require("../database/pa_db");

class Connection extends Model { }

Connection.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imei: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: pa_db,
        modelName: "Connection",
        timestamps: true,
    }
);

module.exports = Connection;
