const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "unify_labs";

async function main() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Database connected successfully");

    const db = client.db(dbName);
    const collection = db.collection("products");

    // Extract product data
    const products = await collection.find({}).toArray();

    console.log("Fetched Products:");
    console.dir(products, { depth: null });
  } catch (err) {
    console.error(
      "An error occurred while connecting to the database:",
      err.message,
    );
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

main().catch(console.error);
