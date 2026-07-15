const passenger = require("./passenger");
const driver = require("./driver");
const Ride = require("./ride");

class BookingSystem {
  constructor() {
    this.passenger = [];
    this.driver = [];
  }

  registerPassenger(passenger) {
    this.passenger.push(passenger);
    console.log("Passenger REgistered succcessfully");
  }

  registerDriver(driver) {
    this.driver.push(driver);
    console.log("Driver Registered succesfully");
  }
  findPassenger(id) {
    return this.passenger.find((p) => p.id == id);
  }

  requestRide(passengerId, distance, vehicleType) {
    const passenger = this.findPassenger(passengerId);

    if (!passenger) {
      console.log("Passenger not found.");
      return;
    }

    const driver = this.driver.find(
      (d) => d.vehicleType === vehicleType && d.isAvailable,
    );

    if (!driver) {
      console.log("No Driver Available.");
      return;
    }

    const ride = new Ride(passenger, driver, distance);

    const fare = ride.calculateFare();

    console.log(`Fare = ${fare}`);

    if (passenger.getBalance() < fare) {
      console.log("Insufficient Balance.");
      return;
    }

    driver.isAvailable = false;

    passenger.deductFunds(fare);
    driver.addFunds(fare);

    passenger.rideHistory.push(ride);

    console.log("driver is available.");

    console.log("Ride Completed Successfully.");

    driver.isAvailable = true;
  }
}

module.exports = BookingSystem;
