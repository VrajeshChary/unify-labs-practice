// 1. Create variables for two numbers
const number1 = 15;
const number2 = 4;

// 2. Calculate Sum, Product, and Remainder
const sum = number1 + number2;
const product = number1 * number2;
const remainder = number1 % number2;

// 3. Output results
console.log("--- Math Operations ---");
console.log("Number 1:", number1);
console.log("Number 2:", number2);
console.log("Sum:", sum);
console.log("Product:", product);
console.log("Remainder:", remainder);

// 4. Declare user name variable
const userName = "Alice";

// 5. Create welcome message using concatenation
// Using string concatenation with + operator as per "The Plus Operator Deep-Dive"
const welcomeMessage =
  "Welcome, " + userName + "! Your magic number is " + sum + ".";

console.log("\n--- String Operations ---");
console.log(welcomeMessage);

// 6. Use typeof to debug and inspect data
console.log("\n--- Data Type Inspection ---");
console.log("Type of number1:", typeof number1); // number
console.log("Type of userName:", typeof userName); // string
console.log("Type of sum:", typeof sum); // number
console.log("Type of welcomeMessage:", typeof welcomeMessage); // string
