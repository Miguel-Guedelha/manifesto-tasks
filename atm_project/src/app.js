const ATM = require("./atm");
const fs = require("fs");
const path = require("path");

data = fs.readFileSync(path.join(__dirname, process.argv[2]), "utf-8");

filteredData = data.split("\r\n\r\n");

const atm = new ATM(parseInt(filteredData[0]));

let out = "";

for (let i = 1; i < filteredData.length; i++) {
  accountData = filteredData[i].split("\n");

  [accountNumber, pin, insertedPin] = accountData[0].split(" ").map((x) => +x);

  [balance, overdraft] = accountData[1].split(" ").map((x) => +x);

  atm.accessAttempt(accountNumber, pin, insertedPin, balance, overdraft);

  for (let j = 2; j < accountData.length; j++) {
    let operation = accountData[j].split(" ");
    switch (operation[0].replace("\r", "")) {
      case "B":
        out += atm.checkBalance() + "\n";
        break;

      case "W":
        out += atm.makeWithdrawl(+operation[1]) + "\n";
        break;

      default:
        console.error("Input format incorrect");
        return;
        break;
    }
  }
}

console.log(out);
