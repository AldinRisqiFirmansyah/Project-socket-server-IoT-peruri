const net = require("net");
const { testConnection } = require("./src/database/db");
const { newClientConect } = require("./src/util/newClientConnect");
const server = net.createServer();
const { workerOn } = require("./worker");

testConnection();
workerOn();



server.on("connection", async (client) => {

  newClientConect(client);
});


server.on("error", (err) => {
});
server.listen(7000, `103.140.90.122`, () => {
});
