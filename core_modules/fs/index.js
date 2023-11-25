const fs = require('fs')
const http = require('http')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
    fs.readFile('./message.html', (err, data) => {
        res.writeHead(200, {'Contenty-type': 'text/html'})
        res.write(data)
        return res.end()
    })
})

server.listen(port, () => console.log(`listen port ${port}`))