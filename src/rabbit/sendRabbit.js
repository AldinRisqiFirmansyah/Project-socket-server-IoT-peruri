var q = 'queue GPS TRACKER';



function bail(err) {
    console.error(err);
    process.exit(1);
}



function publisher(conn, message) {

    conn.createChannel(on_open);
    function on_open(err, ch) {
        if (err != null) bail(err);
        ch.assertQueue(q);
        ch.sendToQueue(q, Buffer.from(message));
        console.log(" [x] Sent %s", message);
        setTimeout(function () {
            conn.close();
        }, 500);
    }
}

function sendTask(message) {
    require('amqplib/callback_api')
        .connect('amqp://localhost', function (err, conn) {
            if (err != null) bail(err);
            publisher(conn, message);
        });
}


module.exports = {
    sendTask,
}