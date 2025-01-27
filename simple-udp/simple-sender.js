const dgram = require("dgram");

const reciever = dgram.createSocket();

reciever.on("message", (message, remoteInfo) => {
    console.log(`Server log: ${message} from ${remoteInfo.address}:${remoteInfo.port}`)
})

reciever.bind({ address: "127.0.0.1", port: 8000 });

reciever("listening", () => {
    console.log(`Server listening ${reciever.address()}`)
})

