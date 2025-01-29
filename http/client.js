const http = require("node:http");

const agent = new http.Agent({ keepAlive: true })

const request = http.request({
    agent: agent,
    hostname: 'localhost',
    port: 8000,
    method: 'POST',
    path: "/create-user",
    headers: {
        "Content-Type": "application/json",
        name: "Sarfraz"
    },
})

request.on("response", (response) => {
    console.log("-------- STATUS--------")
    console.log(response.statusCode)

    console.log("-------- HEADERS--------")
    console.log(response.headers)

    console.log("-------- BODY--------")

    response.on("data", (chunk)=>{
        console.log(chunk.toString('utf-8'))
    })

    response.on("end", ()=>{
        console.log("No more data in response.")
    })
})

request.end(JSON.stringify({ title: 'the title of my post', body: "This is some text and more and more " }))

