const http = require("node:http");

const server = http.createServer();

server.on('request', (request, response) => {

    console.log("---------METHOD:---------");
    console.log(request.method);

    console.log("---------URL:---------");
    console.log(request.url)

    console.log("---------HEADERS:---------");
    console.log(request.headers)

    const name = request.headers.name

    console.log("---------BODY  :---------");

    let data = ""
    request.on("data", (chunk) => {
        data += chunk.toString("utf-8")
    })

    request.on("end", () => {

        console.log(data)
        console.log(name)

        response.writeHead(200, {"Content-Type":'application/json'})
        response.end(JSON.stringify({message:`Post with title ${data.title} was created by ${name}`}))
    })
})


server.listen(8000, () => {
    console.log(`Server is listening on http://localhost:8000`)
})

