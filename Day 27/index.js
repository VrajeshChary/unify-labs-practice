const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 3000;

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "unify_labs";

app.use(express.json());

async function startServer() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    const db = client.db(dbName);
    const collection = db.collection("products");

    // POST /products: Add new items
    app.post("/products", async (req, res) => {
      const { name, price, stock } = req.body;
      if (!name || isNaN(price) || isNaN(stock)) {
        return res.status(400).json({ error: "Invalid product data" });
      }

      try {
        const result = await collection.insertOne({ name, price, stock });
        const newProduct = await collection.findOne({ _id: result.insertedId });
        res.status(201).json(newProduct);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // GET /products: View products (Added for verification convenience)
    app.get("/products", async (req, res) => {
      try {
        const products = await collection.find({}).toArray();
        res.json(products);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // PATCH /products/:id: Update stock
    app.patch("/products/:id", async (req, res) => {
      const { id } = req.params;
      const { stock } = req.body;

      if (stock === undefined || isNaN(stock)) {
        return res
          .status(400)
          .json({ error: "Stock is required and must be a number" });
      }

      try {
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { stock } },
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Product not found" });
        }

        const updatedProduct = await collection.findOne({
          _id: new ObjectId(id),
        });
        res.json(updatedProduct);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // DELETE /products/:id: Remove item
    app.delete("/products/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.listen(port, () => {
      console.log(`Shop API listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

startServer();
