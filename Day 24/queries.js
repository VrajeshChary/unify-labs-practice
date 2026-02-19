// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("unify_labs");

console.log(
  "--- Query 1: Find all products where category is 'Electronics' ---",
);
const electronics = db.products.find({ category: "Electronics" }).toArray();
console.log(JSON.stringify(electronics, null, 2));

console.log(
  "\n--- Query 2: Sort products by price in descending order and limit to 2 ---",
);
const expensiveProducts = db.products
  .find()
  .sort({ price: -1 })
  .limit(2)
  .toArray();
console.log(JSON.stringify(expensiveProducts, null, 2));
