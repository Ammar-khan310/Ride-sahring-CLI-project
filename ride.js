class Ride {
  constructor(passenger, driver, distance) {
    this.passenger = passenger;
    this.driver = driver;
    this.distance = distance;
  }

  calculateFare() {
    const rates = {
      bike: 50,
      car: 100,
      "ac-car": 150,
    };

    return rates[this.driver.vehicleType] * this.distance;
  }
}

module.exports = Ride;
