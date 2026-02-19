// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("unify_labs");

// Create a new collection.
// db.createCollection('products');

// Clean up existing data for idempotency
db.products.deleteMany({});

// Insert 5 products with different categories
db.products.insertMany([
  {
    name: "Smartphone X",
    category: "Electronics",
    price: 699,
    stock: 50,
    specs: {
      color: "Midnight Black",
      weight: "170g",
      storage: "128GB",
      screen: "6.1 inch OLED",
    },
  },
  {
    name: "Laptop Pro 15",
    category: "Electronics",
    price: 1499,
    stock: 25,
    specs: {
      color: "Silver",
      weight: "1.8kg",
      processor: "M2 Chip",
      memory: "16GB",
    },
  },
  {
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 299,
    stock: 12,
    specs: {
      color: "Charcoal Grey",
      material: "Mesh",
      adjustableHeight: true,
      lumbarSupport: true,
    },
  },
  {
    name: "Running Sneakers",
    category: "Clothing",
    price: 89,
    stock: 100,
    specs: {
      color: "Blue/White",
      size: 42,
      gender: "Unisex",
      material: "Synthetic",
    },
  },
  {
    name: "Noise Cancelling Headphones",
    category: "Electronics",
    price: 249,
    stock: 200,
    specs: {
      color: "Black",
      type: "Over-ear",
      wireless: true,
      batteryLife: "30h",
    },
  },
]);

console.log("Inserted 5 products successfully.");
