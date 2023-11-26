//external modules
const inquirer = require("inquirer");
const chalk = require("chalk");

//core modules
const fs = require("fs");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
          "Create account",
          "Balance inquiry",
          "Deposit",
          "Withdraw",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      console.log(action);
      switch (action) {
        case "Create account":
          buildAccount();
          break;
        case "Balance inquiry":
          getAccountBalance();
          break;
        case "Deposit":
          deposit();
          break;
        case "Withdraw":
          withdraw()
          break;
        case "Exit":
          console.log(chalk.bgBlue.black("Thank you!"));
          process.exit();
      }
    })
    .catch((err) => console.log(err));
}

//create account
function buildAccount() {
  inquirer
    .prompt([{ name: "accountName", message: "Type your account name user:" }])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!fs.existsSync("./accounts")) {
        fs.mkdirSync("./accounts");
      }
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("This name is already used, chose another name")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        `{"balance": 0}`,
        (err) => console.log(err)
      );
      console.log(chalk.bgGreen.black("congrats for the new account opening"));

      operation();
    })
    .catch((err) => console.log(err));
}

//Deposit
//add an amount to user account
function deposit() {
  inquirer
    .prompt([{ name: "accountName", message: "Whats your account name?" }])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        return deposit();
      }
      inquirer
        .prompt([
          {
            name: "amount",
            message: "How much do you want to deposit?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black(
        "This account does not exist, chose another account name"
      )
    );
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed("error, try later"));
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(chalk.green(`$ ${amount} was deposited`));
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(accountJSON);
}

//show account balance
function getAccountBalance() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Whats your account name?'
    }]).then((answer) => {
        const accountName = answer["accountName"]

        if(!checkAccount(accountName)) {
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)
        console.log(chalk.bgBlue(`Balance: $ ${accountData.balance}`))
    }).catch((err) => console.log(err))
}

//Withdrawal
function withdraw() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Whats your account name?'
    }]).then((answer) => {
        const accountName = answer["accountName"]

        if(!checkAccount(accountName)) {
            return withdraw()
        }
        inquirer.prompt([{
            name: 'amount',
            message: 'type the withdraw value'
        }]).then(
            (answer) => {
                const amount = answer['amount']
                removeAmount(accountName, amount)
            }
        ).catch((err) => console.log(err))

    }).catch((err) => console.log(err))
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)
    if(!amount) {
        console.log(chalk.bgRed('error, try later'))
        return withdraw()
    }

    if(accountData.balance < amount) {
        console.log(chalk.bgRed('value is not enoght'))
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err)
        }
        )
        console.log(chalk.bgGreen(`A $ ${amount} widthdraw was completed`))
        operation()
}