const net = require("net");
const fs = require('node:fs/promises')

const server = net.createServer(() => { });

let fileHandle, fileWriteStream

server.on("connection", (socket) => {
    console.log("New connection")

    socket.on("data", async (data) => {
        if (!fileHandle) {
            socket.pause();

            const indexOfDivider = data.indexOf("-------");
            const fileName = data.subarray(10, indexOfDivider).toString('utf-8')

            fileHandle = await fs.open(`storage/${fileName}`, "w")
            fileWriteStream = fileHandle.createWriteStream();

            // Writing to our destination file
            fileWriteStream.write(data)

            fileWriteStream.on("drain", () => {
                socket.resume()
            })
        } else {
            if (!fileWriteStream.write(data)) {
                socket.pause();
            }

        }
    });

    // this end event happens when the client.js file ends the socket
    socket.on("end", () => {
        // fileHandle.close()
        fileHandle = undefined;
        fileWriteStream = undefined;
        socket.end();
        console.log("Connection ended")
    })

})


server.listen(5050, "::1", () => {
    console.log("Uploader server opened on", server.address())
})
