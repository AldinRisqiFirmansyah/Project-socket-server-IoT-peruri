const { Sequelize } = require("sequelize");
const pa_db = new Sequelize(
    "", // database name
    "", // database user
    "",  // database password
    {
        host: "", // your host
        dialect: "postgres",
    }
);

module.exports = pa_db;
