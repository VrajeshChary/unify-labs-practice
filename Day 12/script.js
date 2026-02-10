// Number Guessing Game

// 1. Generate a random number between 1 and 100
const targetNumber = Math.floor(Math.random() * 100) + 1;

// 2. Initialize variables
let attempts = 0;
const maxAttempts = 10;
let guessedCorrectly = false;

console.log("Welcome to the Number Guessing Game!");
console.log("I have picked a number between 1 and 100. Can you guess it?");

// 3. Start the game loop
while (!guessedCorrectly && attempts < maxAttempts) {
  // 4. Prompt user for input
  let input = prompt(
    `Attempt ${attempts + 1}/${maxAttempts}: Guess the number (1-100):`,
  );

  // Handle cancel button
  if (input === null) {
    alert("Game Cancelled.");
    break;
  }

  // 5. Convert string to number
  let guess = Number(input);

  // 6. Validate input
  if (isNaN(guess) || input.trim() === "") {
    alert("Please enter a valid number.");
    continue; // Skip to next iteration
  }

  attempts++;

  // 7. Check the guess
  if (guess === targetNumber) {
    alert(
      `Congratulations! You guessed the number ${targetNumber} in ${attempts} attempts.`,
    );
    guessedCorrectly = true;
  } else if (guess < targetNumber) {
    alert("Too Low! Try again.");
  } else {
    alert("Too High! Try again.");
  }
}

// 8. Handle Game Over
if (!guessedCorrectly && attempts >= maxAttempts) {
  alert(
    `Game Over! You've used all ${maxAttempts} attempts. The number was ${targetNumber}.`,
  );
}
