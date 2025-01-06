// console.time("writeMany")
// let a = 2 + 2;
// console.timeEnd("writeMany")

// const fs = require("node:fs/promises");

// Execution Time: 8s
// CPU Usage: 100% (one once)
// Memory Usage: 50MB
// (async () => {
//     console.time("writeMany")
//     const fileHandler = await fs.open("text.txt", "w")
//     for (let i = 0; i < 1000000; i++) {
//         fileHandler.write(` ${i} `)
//     }
//     console.timeEnd("writeMany");
// })()





// const fs = require('node:fs');

// (async () => {
//     console.time("writeMany")
//     fs.open("text.txt", "w", (err, fd) => {
//         for (let i = 0; i < 1000000; i++) {
//             const buff = Buffer.from(` ${i} `, "utf-8")
//             fs.writeSync(fd, buff)
//         }
//         console.timeEnd("writeMany");
//     })

// })()



// Execution Time: 400ms
// CPU Usage: 100% (one once)
// Memory Usage: 50MB

// const fs = require('node:fs/promises');

// (async () => {
//     console.time("writeMany")
//     const fileHandler = await fs.open("text.txt","w");

//     const stream = fileHandler.createWriteStream()

//     for(let i=0; i<1000000; i++){
//         const buff = Buffer.from(` ${i} `, "utf-8");
//         stream.write(buff)
//     }

//     console.timeEnd("writeMany")

// })()




const fs = require('node:fs/promises');

(async () => {
    console.time("writeMany")
    const fileHandler = await fs.open("text.txt", "w");

    const stream = fileHandler.createWriteStream()

    console.log(stream.writableHighWaterMark)
    console.log(stream.writableLength)

    // const buff = Buffer.alloc(16383, 10)
    // console.log(buff)
    // console.log(stream.write(buff))
    // console.log(stream.write(Buffer.alloc(1, "a")))
    // console.log(stream.write(Buffer.alloc(1,"a")))
    // console.log(stream.write(Buffer.alloc(1,"a")))


    // this will execute when allocation is full
    // stream.on("drain", () => {
    //     // console.log(stream.write(Buffer.alloc(1, "a")))
    //     // console.log(stream.writableLength);

    //     console.log("we are not safe to write more!")
    // })

    // const buff = Buffer.from("string")
    // console.log(buff)
    // console.log(stream.writableLength)


    let i = 0;

    const writeMany = () => {
        while (i < 1000000) {
            const buff = Buffer.from(` ${i} `, "utf-8");

            // this is our last write
            if (i === 999999) {
                return stream.end(buff)
            }

            // if stream.write returns false, stop the loop  
            if (!stream.write(buff)) break;

            i++;
        }
    }
    writeMany()

    // resume our loop once our stream's internal buffer is empty
    stream.on("drain", () => {
        writeMany()
    })

    stream.on("finish", ()=>{
        console.timeEnd("writeMany")
        fileHandler.close()
    })

})()
