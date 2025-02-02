const http = require("node:http")

class Butter {

    constructor(){
        this.server = http.createServer()

        this.server.on("request", (req,res)=>{
            console.log("request come in")
        })
    }

    listen = (port,cb)=>{
        this.server.listen(port, ()=>{
            cb()
        })
    }

    route = (method, url, cb)=>{
        if(method === 'GET'){
            
        }
    }

}

module.exports = Butter