const fs = require("node:fs/promises");

(async () => {
    const fileHandleRead = await fs.open('text.txt', "r")
    const fileHandleWrite = await fs.open('dest.txt', 'w')

    const stream = fileHandleRead.createReadStream({ highWaterMark: 64 * 1024 })
    const stream1 = fileHandleWrite.createWriteStream()

    stream.on("data", (chunk) => {
        console.log("---------")
        console.log(chunk)
        stream1.write(chunk)
    })

})()