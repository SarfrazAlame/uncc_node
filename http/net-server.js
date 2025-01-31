const net = require('net')

const server = net.createServer((socket)=>{
    socket.on("data", (data)=>{
        console.log(data.toString("utf-8"))
    })

    const response = Buffer.from("46783are5e95607de965a98s02c6s98e","hex")

    socket.write("response")
})


server.listen(8000, "127.0.0.1", ()=>{
    console.log("opened server on", server.address())
})


