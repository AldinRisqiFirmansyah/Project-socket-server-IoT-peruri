#!/usr/bin/env node

const amqp = require("amqplib/callback_api");

async function sendData(imei, data) {
    new Promise((resolve, reject) => {
        amqp.connect("amqp://localhost", function (error0, connection) {
            if (error0) {
                reject(error0);
            } else {
                resolve(connection);
            }
        }); z
    })
        .then((connection) => {
            new Promise((resolve1, reject1) => {
                connection.createChannel(function (error1, channel) {
                    if (error1) {
                        reject1(error1);
                    } else {
                        resolve1(channel);
                    }
                });
            })
                .then((channel) => {
                    new Promise((resolve2, reject2) => {
                        const exchange = "topic_logs";
                        const key = imei;
                        const msg = data;

                        channel.assertExchange(exchange, "topic", {
                            durable: false,
                        });
                        channel.publish(exchange, key, Buffer.from(msg));
                        resolve2();
                    })
                        .then(() => {
                            setTimeout(function () {
                                connection.close();
                                process.exit(0);
                            }, 500);
                        })
                        .catch((err) => {
                        });
                })
                .catch((err) => {
                });
        })
        .catch((err) => {
        });
}

module.exports = {
    sendData,
};
