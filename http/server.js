const http = require("node:http");

const server = http.createServer();

server.on('request', (request, response) => {


    console.log("---------METHOD:---------");
    console.log(request.method);

    console.log("---------URL:---------");
    console.log(request.url)

    console.log("---------HEADERS:---------");
    console.log(request.headers)

    console.log("---------BODY  :---------");
    request.on("data", (chunk) => {
        console.log(chunk.toString("utf-8"))
    })

})

server.listen(8000, () => {
    console.log(`Server is listening on http://localhost:8000`)
})

