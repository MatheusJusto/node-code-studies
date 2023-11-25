const chalk = require('chalk')
const nota = 9

console.log(chalk.bgRed(chalk.blue.bold(nota), ' + ', chalk.redBright.bold(1), ' = ', chalk.greenBright.bold(10)))


// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout,
// })

// readline.question("Qual sua linguagem preferida? ", (language) => {
//     console.log(`A minha linguagem preferida é ${language}`)
//     readline.close()
// })

const inquirer = require('inquirer')

inquirer.prompt([{name: "p1", message: "Qual a primeira nota?"}, {name: "p2", message: "Qual a segunda nota?"},]).then((answers)).catch((err) => console.log(err))
