class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((sum, transaction) => sum + transaction.value, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  // checks if withdrawal is possible, e.g. balance has enough money
  withdrawalAllowed() {
    return this.account.balance + this.value >= 0;
  }

  commit() {
    if (this.withdrawalAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      console.log('Sorry, you don\'t have enough money in your account to withdraw that amount');
    }
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

t1 = new Deposit(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

console.log('Balance:', myAccount.balance);

t3 = new Withdrawal(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);
