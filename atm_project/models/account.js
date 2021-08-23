const responseCodes = require("../enum/responseCode");

class Account {
  constructor(accountId, pin, insertedPin, balance, overdraft) {
    this.accountId = accountId;
    this.balance = balance;
    this.overdraft = overdraft;
    this.pin = pin;
    this.isAuthorized = pin === insertedPin;
  }

  hasFundsAvailable(amount) {
    return this.balance + this.overdraft >= amount;
  }

  makeWithdrawl(amount) {
    if (this.isAuthorized) {
      if (this.hasFundsAvailable(amount)) {
        this.balance -= amount;
        return this.balance;
      }
      throw responseCodes.FUNDS_ERR;
    }
    throw responseCodes.ACCOUNT_ERR;
  }

  checkBalance() {
    if (this.isAuthorized) {
      return this.balance;
    }
    throw responseCodes.ACCOUNT_ERR;
  }
}

module.exports = Account;
