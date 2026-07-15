const Account = require("./account");

class Passenger extends Account {
  constructor(id, name, phoneNumber, currentLocaton, rideHistory) {
    super(id, name, phoneNumber);

    this.currentLocaton = currentLocaton;
    this.rideHistory = [];
  }
}

module.exports = Passenger;
