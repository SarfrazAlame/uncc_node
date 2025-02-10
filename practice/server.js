const http = require('http')

const server = http.createServer()

server.on("request", (req,res)=>{
    console.log(req.url)
    console.log(req.headers)
    console.log(req.statusCode)

    req.on("data", (chunks)=>{
        console.log(chunks.toString("utf-8"))
    })
})

server.listen(8080,()=>{
    console.log("Server is running")
})