const { Writable } = require("node:stream");
const fs = require("node:fs");
const fsPromises = require('node:fs/promises');

class FileWriteStream extends Writable {
    constructor({ highWaterMark, fileName }) {
        super({ highWaterMark });

        this.fileName = fileName;
        this.fd = null;
        this.chunks = [];
        this.chunksSize = 0;
        this.writesCounts = 0;
    }

    // this will run after the constructor, and it will put off all calling the other methods until we call the callback function.
    _construct(callback) {
        fs.open(this.fileName, "w", (err, fd) => {
            if (err) {
                // if we call the callback with an argument, it means that we have an error and we should not proceed.
                callback(err)
            } else {
                this.fd = fd;
                // no arguments means it was successful.
                callback()
            }
        })
    }

    _write(chunk, encoding, callback) {
        this.chunks.push(chunk)
        this.chunksSize += chunk.length;

        if (this.chunksSize > this.writableHighWaterMark) {
            fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
                if (err) {
                    return callback(err)
                }
                this.chunks = [];
                this.chunksSize = 0;
                ++this.writesCounts;
                callback()
            })
        } else {
            // when we're done, we should call the callbach functions
            callback()
        }
    }

    _final(callback) {
        fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
            if (err) return callback(err)

            this.chunks = []
            callback()
        })
    }

    _destroy(error, callback) {
        console.log("Number of write " + this.writesCounts)
        if (this.fd) {
            fs.close(this.fd, (err) => {
                callback(err || error)
            })
        } else {
            callback(error)
        }
    }
}


// const stream = new FileWriteStream({ highWaterMark: 1800, fileName: 'text.txt' });
// stream.write(Buffer.from("this is some string "))
// stream.end(Buffer.from("Our last write"))

// stream.on("finish", () => {
//     console.log("Stream was finished")
// });



// testing 

(async () => {
    console.time("writeMany")
    const fileHandler = await fsPromises.open("text.txt", "w");

    const stream = new FileWriteStream({ fileName: 'text.txt' })

    let i = 0;

    const writeMany = () => {
        while (i < 100000) {
            const buff = Buffer.from(` ${i} `, "utf-8");

            // this is our last write
            if (i === 99999) {
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

    stream.on("finish", () => {
        console.timeEnd("writeMany")
        fileHandler.close()
    })

})()
