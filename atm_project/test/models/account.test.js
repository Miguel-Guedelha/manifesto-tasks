const Account = require("../../models/account");
const responseCodes = require("../../enum/responseCode");

test("succeed to withdraw 500 with 400 balance and 100 overdraft", () => {
  expect(new Account(1, 1, 1, 400, 100).makeWithdrawl(500)).toBe(-100);
});

test("fail to withdraw 501 with 400 balance and 100 overdraft", () => {
  try {
    new Account(1, 1, 1, 400, 100).makeWithdrawl(501);
    //expecting exception so if we progress just fail the test
    expect(true).toBe(false);
  } catch (error) {
    expect(error).toBe(responseCodes.FUNDS_ERR);
  }
});

test("fail to withdraw due to wrong pin", () => {
  try {
    new Account(1, 1234, 1233, 1, 1).makeWithdrawl(1);
    //expecting exception so if we progress just fail the test
    expect(true).toBe(false);
  } catch (error) {
    expect(error).toBe(responseCodes.ACCOUNT_ERR);
  }
});
