class Account {
  #balance;

  constructor(id, name, phoneNumber) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.#balance = 0;
  }

  getBalance() {
    return this.#balance;
  }

  addFunds(amount) {
    // const amount = readline.question("Enter amount number:");

    if (amount <= 0) {
      console.log("Please a enter a valid amount.");
      return;
    }
    this.#balance += amount;
    console.log(` The balance is${this.#balance}`);
  }

  deductFunds(amount) {
    if (amount <= 0 || amount > this.#balance) {
      console.log("Enter a valid amount to deduct.");
      return;
    }

    this.#balance -= amount;

    return console.log(` The balance is${this.#balance}`);
  }
}
module.exports = Account;
