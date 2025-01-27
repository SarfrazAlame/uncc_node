const http = require("node:http");

const agent = new http.Agent({keepAlive:true})

const request = http.request({
    agent:agent,
    hostname:'localhost',
    port:8000,
    method:'POST',
    path:"/create-user",
    headers:{
        "Content-Type":"application/json"
    },
})

request.on("response", (response)=>{})

request.write(JSON.stringify({message:'Hi there!'}))
request.write(JSON.stringify({message:'How are you doing'}))
request.write(JSON.stringify({message:'Hey you still there?'}))
request.write(JSON.stringify({message:'Hey you still there?'}))

request.end(JSON.stringify({message:"This is going to be my last message"}))


