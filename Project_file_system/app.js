const fs = require("fs/promises");

(async () => {


    // command
    const CREATE_FILE = "create a file"
    const DELETE_FILE = "delete the file"
    const RENAME_FILE = "rename the file"
    const ADD_TO_FILE = "add to the file"

    const createFile = async (path) => {
        try {
            // let's check whether the file exist.
            const existingFile = await fs.open(path, 'r')
            existingFile.close()

            return console.log(`the file ${existingFile} is already exists `)
        } catch (error) {
            const newFilehandler = await fs.open(path, 'w')
            newFilehandler.close()
            return console.log(`the file is successfully created.`)
        }
    }

    const deleteFile = async (path) => {
        fs.unlink(path)
        console.log("the file was successfully removed")
    }

    const renameFile = async (oldFilePath, newFilePath) => {
        fs.rename(oldFilePath, newFilePath)
        console.log("the file was successfully renamed.")
    }

    let addedContents;

    const addToFile = async (path, content) => {
        if(addedContents === content) return;
        const fileHandler = await fs.open(path, "a")
        addedContents = content
        fileHandler.write(content)
    }


    const commandFileHandler = await fs.open("./command.txt", "r")

    commandFileHandler.on("change", async () => {
        // get the size of our file
        const size = (await commandFileHandler.stat()).size
        // allocate our buffer with the size of the file 
        const buff = Buffer.alloc(size)
        // the location at which we want to start filling our buffer
        const offset = 0;
        // how many bytes we want to read
        const length = buff.byteLength;
        // the position that we want to start reading the file from
        const position = 0;
        // we always want to read the whole content 
        const content = await commandFileHandler.read(buff, offset, length, position)

        const command = buff.toString('utf-8')

        // create a file
        // create file <path>
        if (command.includes(CREATE_FILE)) {
            const filePath = command.substring(CREATE_FILE.length + 1)
            createFile(filePath)
        }

        // delete a file
        // delete file <path>
        if (command.includes(DELETE_FILE)) {
            const filePath = command.substring(DELETE_FILE.length + 1)
            deleteFile(filePath)
        }

        // rename a file
        // rename file <path> to <new path>
        if (command.includes(RENAME_FILE)) {
            const _idx = command.indexOf(" to ")
            const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx)
            const newFilePath = command.substring(_idx + 4)

            renameFile(oldFilePath, newFilePath)
        }

        //  add to file;
        // add to the file <path> this content: <content>
        if (command.includes(ADD_TO_FILE)) {
            const _idx = command.indexOf(" this content: ")
            const filePath = command.substring(ADD_TO_FILE.length + 1, _idx)
            const content = command.substring(_idx + 15)

            addToFile(filePath,content)
        }
    })

    const watcher = fs.watch("./command.txt");

    for await (const event of watcher) {
        if (event.eventType === "change") {
            commandFileHandler.emit('change')
        }
    }
})()
