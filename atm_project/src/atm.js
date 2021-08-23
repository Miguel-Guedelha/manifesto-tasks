const Account = require("../models/account");
const responseCodes = require("../enum/responseCode");

class ATM {
  constructor(balance) {
    this.balance = balance;
  }

  accessAttempt(accountNumber, pin, insertedPin, balance, overdraft) {
    this.currentUser = new Account(
      accountNumber,
      pin,
      insertedPin,
      balance,
      overdraft
    );
  }

  makeWithdrawl(amount) {
    try {
      if (this.balance - amount < 0) {
        return responseCodes.ATM_ERR;
      }
      let removed = this.currentUser.makeWithdrawl(amount);
      this.balance -= amount;
      return removed;
    } catch (e) {
      return e;
    }
  }

  checkBalance() {
    try {
      return this.currentUser.checkBalance();
    } catch (error) {
      return error;
    }
  }
}

module.exports = ATM;
