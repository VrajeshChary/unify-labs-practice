const { MongoClient } = require("mongodb");
const products = require("./products.json");
require("dotenv").config({ path: __dirname + "/../.env" }); // Look one folder up

async function seedDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI not found in .env file. Please create it first.");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db("unify_ecommerce"); // Create a new database for E-commerce
    const collection = db.collection("products");

    // Clear existing products to prevent duplicates on re-run
    await collection.deleteMany({});
    console.log("Cleared existing products");

    // Insert new products
    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products successfully inserted.`);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

seedDatabase();
