const readline = require("readline-sync");

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

class Passenger extends Account {
  constructor(id, name, phoneNumber, currentLocaton, rideHistory) {
    super(id, name, phoneNumber);

    this.currentLocaton = currentLocaton;
    this.rideHistory = [];
  }
}

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

const system = new BookingSystem();

async function uber() {
  while (true) {
    console.log("Uber app");
    console.log(`1) Register passenger`);
    console.log(`2) Register driver`);
    console.log(`3) add-Funds`);
    console.log(`4) Request ride`);
    console.log(`5) check balance `);
    console.log(`6) Ride History`);
    console.log(`7) Exit`);

    const option = readline.question("Enter an option:");

    switch (Number(option)) {
      case 1: {
        const id = readline.question("Enter id number:");
        const name = readline.question("Enter your name:");
        const phoneNumber = readline.question("Enter your phone Number:");
        const location = readline.question("Enter your current location:");

        const passenger = new Passenger(id, name, phoneNumber, location);

        system.registerPassenger(passenger);

        break;
      }

      case 2: {
        const ID = readline.question("driver ID:");
        const Name = readline.question("Enter your name:");
        const PhoneNumber = readline.question("Enter your phone Number:");
        const vehicle = readline.question("Vehicle: bike , car , ac-car : ");

        const driver = new Driver(ID, Name, PhoneNumber, vehicle);

        system.registerDriver(driver);

        break;
      }
      case 3: {
        const Id = readline.question("passenger id:");
        const Passenger = system.findPassenger(Id);
        if (!Passenger) {
          console.log("Passenger not found");
        } else {
          const amount = Number(readline.question("Enter the amount:"));
          Passenger.addFunds(amount);
        }
        break;
      }
      case 4: {
        const id2 = readline.question("passenger id:");
        const distance = Number(readline.question("Enter distance in kms:"));
        const VEhicle = readline.question(
          "Choose vehicle: bike , car , ac-car: ",
        );
        system.requestRide(id2, distance, VEhicle);
        break;
      }

      case 5: {
        const id3 = readline.question("passenger id:");
        const PAssenger = system.findPassenger(id3);

        if (!PAssenger) {
          console.log("Passenger not foiund");
        } else {
          console.log(`balacne: ${PAssenger.getBalance()}`);
        }
        break;
      }
      case 6:
        {
          const rideHis = readline.question("Enter passenger id :");
          const hist = system.findPassenger(rideHis);
          if (hist) {
            hist.rideHistory.forEach((ride, index) => {
              console.log(`
                    Driver : ${ride.driver.name}  vehicle : ${ride.driver.vehicleType}  Distance : ${ride.distance} KMs 
                     Fare : ${ride.calculateFare()}           
                `);
            });
          } else {
            console.log("passenger not found");
          }
        }
        break;

      case 7: {
        console.log("Program Exited");
        return;
      }

      default: {
        console.log("Please enter a valid option");
        break;
      }
    }
  }
}

uber();
