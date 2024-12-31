const {Buffer} = require('buffer')

// const memoryContainer = Buffer.alloc(4)

// memoryContainer[0] = 0xf4;
// memoryContainer[1] = 0x34;
// // memoryContainer[2] = -34;
// // memoryContainer.writeInt8(-34,2)
// memoryContainer[2] = 0x00;
// memoryContainer[3] = 0xff;


// console.log(memoryContainer[0])
// console.log(memoryContainer[1])
// console.log(memoryContainer[2])
// console.log(memoryContainer[3])

// for(let i =0; i<4; i++){
//     console.log(memoryContainer[i])
// }

// console.log(memoryContainer.toString("utf8"))



// const buff = Buffer.from("486921", "hex")
// console.log(buff.toString("utf-8"))

const buff = Buffer.from("Hi!", "utf-8")
console.log(buff)