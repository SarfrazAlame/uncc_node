const Butter = require("./butter")

const PORT = 4060;

const server = new Butter()

server.listen(PORT, ()=>{
    console.log(`Server has started on port ${PORT}`);
})