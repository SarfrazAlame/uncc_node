// const fs = require('fs')

// const contents = fs.readFileSync("./text.txt")

// console.log(contents.toString('utf-8'))



// ****** Promise API ****** //
// const fs = require("fs/promises");

// (async () => {
//   try {
//     await fs.copyFile("text.txt", "copied-promise.txt");
//   } catch (error) {
//     console.log(error);
//   }
// })();



// ****** Callback API ****** //
// const fs = require("fs");

// fs.copyFile("file.txt", "copied-callback.txt", (error) => {
//   if (error) console.log(error);
// });

// ****** Synchronous API ****** //
// const fs = require("fs");

// fs.copyFileSync("file.txt", "copied-sync.txt");

////////////////////////////////////////////////////////////////////////// revision ///////////////////////////////////////////////////////////////////////////////

// const fs = require('fs')

// const data = fs.readFileSync('text.txt')

// console.log(data.toString('utf-8'))


// Promises API
// const fs = require("fs/promises");

// (async()=>{
//   try {
//     await fs.copyFile('text.txt','copied-promise.txt')

//   } catch (error) {
//     console.log(error)
//   }
// })()

// callback api
