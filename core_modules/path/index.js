const path = require('path')

const customPath = "/documents/reports/report1.pdf"

console.log(path.dirname(customPath))
console.log(path.basename(customPath))
console.log(path.extname(customPath))

console.log(path.resolve('test.txt'))