const pa_db = require("./pa_db");

const sequelize = pa_db;

async function testConnection() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true, logging: false });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = {
    testConnection,
};
