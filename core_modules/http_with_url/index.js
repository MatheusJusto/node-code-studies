const http = require('http')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
    
    const urlInfo = url.parse(req.url, true)
    const name = urlInfo.query.name 
    
    res.statusCode = 200
    res.setHeader('Contenty-Type', 'text/html')

    if(!name) {
        res.end(`<h1>fill with your name:</h1> <form method="GET"><input type="text" name="name" /><input type="submit" value="send" /></form>`)
    } else {
        res.end(`<h1>welcome: ${name}</h1>`)
    }
    
    
    
})

server.listen(port, () => console.log(`Server is listening on port ${port}`))