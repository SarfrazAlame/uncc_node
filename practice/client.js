const http = require('http')

const socket = http.createConnection({port:8080})

socket.on("data", (chunk)=>{
    console.log(chunk.toString("utf-8"))
})
