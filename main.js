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
  constructor(id, name, phoneNumber, vehicletype) {
    super(id, name, phoneNumber);
    const vehicleAllow = ["bike", "car", "ac-car"];

    if (!vehicleAllow.includes(vehicletype)) {
      console.log("Incorrect vehicle type.");
    }
    this.vehicletype = vehicletype;
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

    return rates[this.driver.vehicletype] * this.distance;
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

  Registerdriver(driver) {
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

    if (Passenger.getBalance() < fare) {
      console.log("Insufficient Balance.");
      return;
    }

    driver.isAvailable = false;

    passenger.deductFunds(fare);
    driver.addFunds(fare);

    passenger.rideHistory.push(ride);

    console.log("Ride Completed Successfully.");

    driver.isAvailable = true;
  }
}

const system = new BookingSystem();

async function uber() {
  while (true) {
    console.log("Uber app");
    console.log(`1) Registerpassenger`);
    console.log(`2) Registerdriver`);
    console.log(`3) addFunds`);
    console.log(`4) deductFunds`);
    console.log(`5) Ride`);
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

        system.Registerdriver(driver);

        break;
      }
      case 3: {
        const Id = readline.question("passenger id:");
        const Passenger = system.findPassenger(Id);
        if (!Passenger) {
          console.log("Passenger not found");
        }

        const amount = Number(readline.question("Enter the amount:"));
        passenger.addFunds(amount);
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
        }

        console.log(`balacne: ${Passenger.getBalance}`);
        break;
      }
      case 6:
        {
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
