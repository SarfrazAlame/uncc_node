const http = require("node:http")

class Butter {

    constructor(){
        this.server = http.createServer()

        this.routes = {}

        this.server.on("request", (req,res)=>{
            
            this.routes[req.method.toLocaleLowerCase()+req.url]();
        })
    }

    listen (port,cb){
        this.server.listen(port, ()=>{
            cb()
        })
    }

    route(method, url, cb){
        
    }

}

module.exports = Butter