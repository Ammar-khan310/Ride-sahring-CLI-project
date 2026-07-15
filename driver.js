const Account = require("./account");

class Driver extends Account {
  constructor(id, name, phoneNumber, vehicleType) {
    super(id, name, phoneNumber);
    const vehicleAllow = ["bike", "car", "ac-car"];

    if (!vehicleAllow.includes(vehicleType)) {
      console.log("Incorrect vehicle type.");
    }
    this.vehicleType = vehicleType;
    this.isAvailable = true;
  }
}
module.exports = Driver;
