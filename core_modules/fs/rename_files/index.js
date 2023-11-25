const fs = require('fs')

const oldFile = "file.txt"
const newFile = "newFile.txt"
fs.rename(oldFile, newFile, (err) => {
    if(err) {
        console.log(err)
        return
    }

    console.log(`file ${oldFile} was renamed to ${newFile}`)
})