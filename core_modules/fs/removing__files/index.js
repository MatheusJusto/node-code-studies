const fs = require('fs')

fs.unlink('file.txt', (err) => {
    if(err) {
        console.log(err)
        return
    }
    console.log('file removed')
})