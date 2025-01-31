const net = require('net')

const socket = net.createConnection({host:"localhost", port:8000}, ()=>{
    const buff = Buffer.alloc(8)
    buff[0] = 12;
    buff[1] = 34;

    socket.write(buff)
})

socket.on("data", (chunk)=>{
    console.log("Received Response")
    console.log(chunk.toString('utf-8'))
    socket.end()
})

socket.on("end", ()=>{
    console.log("Connection closed")
})