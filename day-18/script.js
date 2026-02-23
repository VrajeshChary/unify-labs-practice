class Pet {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this._health = 100; // Private property convention
    this.hunger = 0;
    this.energy = 100;
  }

  // Getter for health
  get health() {
    return this._health;
  }

  // Setter for health to ensure it stays between 0 and 100
  set health(value) {
    if (value > 100) {
      this._health = 100;
    } else if (value < 0) {
      this._health = 0;
    } else {
      this._health = value;
    }
  }

  // Method to feed the pet
  feed() {
    this.hunger -= 20;
    if (this.hunger < 0) this.hunger = 0;
    this.health += 10; // Feeding improves health
    this.energy += 5; // Feeding gives a bit of energy
    console.log(
      `${this.name} has been fed! Hunger decreased, health and energy increased.`,
    );
  }

  // Method to play with the pet
  play() {
    if (this.energy < 10) {
      console.log(`${this.name} is too tired to play!`);
      return;
    }
    this.energy -= 20;
    if (this.energy < 0) this.energy = 0;
    this.hunger += 10;
    this.health += 5; // Exercise is good for health
    console.log(
      `${this.name} played happily! Energy decreased, hunger and health increased.`,
    );
  }

  // Method to get status
  getStatus() {
    return `${this.name} the ${this.type} - Health: ${this.health}, Hunger: ${this.hunger}, Energy: ${this.energy}`;
  }
}

// Export for Node.js testing environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = Pet;
}
