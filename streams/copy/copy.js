const fs = require('node:fs/promises');

// (async () => {
//     console.time("copy")
//     const destFile = await fs.open("text-copy.txt", "w");
//     const result = await fs.readFile("text.txt")

//     // console.log(result)
//     await destFile.write(result)
//     console.timeEnd("copy")
// })()



// (async () => {
//     console.time("copy")

//     const srcFile = await fs.open("text.txt", "r");
//     const destFile = await fs.open("dest.txt", "w")

//     let bytesRead = -1;

//     while (bytesRead !== 0) {
//         const readResult = await srcFile.read();
//         bytesRead = readResult.bytesRead;

//         destFile.write(readResult.buffer)
//     }

//     console.timeEnd("copy")
// })()







(async () => {
    console.time("copy")

    const srcFile = await fs.open("text.txt", "r");
    const destFile = await fs.open("dest.txt", "w")

    const streamRead = srcFile.createReadStream()
    const streamWrite = destFile.createWriteStream()

    streamRead.pipe(streamWrite)

    streamRead.on("end", () => {
        console.timeEnd("copy")
    })

})()
