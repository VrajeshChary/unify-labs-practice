const express = require("express");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Caching MongoDB connection for serverless
let cachedDb = null;

async function connectDB() {
  if (cachedDb) return cachedDb;
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    cachedDb = client.db("unify_ecommerce");
    console.log("Connected to MongoDB Atlas");
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

// ==========================================
// API ROUTES
// ==========================================

// Seed database from the cloud (Bypass Local ISP blocks)
app.get("/api/seed", async (req, res) => {
  try {
    const productsList = require("./scripts/products.json");
    const db = await connectDB();
    const collection = db.collection("products");
    await collection.deleteMany({});
    const result = await collection.insertMany(productsList);
    res.json({ message: "Seeding successful", count: result.insertedCount });
  } catch (error) {
    console.error("Seed error:", error);
    res
      .status(500)
      .json({ error: "Failed to seed database", details: error.message });
  }
});

// 1. Get all products (with optional search & category filtering)
app.get("/api/products", async (req, res) => {
  try {
    const category =
      typeof req.query.category === "string" ? req.query.category : null;
    const search =
      typeof req.query.search === "string" ? req.query.search : null;
    let query = {};

    // Exact match for category
    if (category && category !== "All") {
      query.category = category;
    }

    // Case-insensitive regex match for search terms in the product name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const db = await connectDB();
    const results = await db.collection("products").find(query).toArray();
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch products",
      details: error.message,
      stack: error.stack,
    });
  }
});

// 2. Submit a checkout order
app.post("/api/orders", async (req, res) => {
  try {
    const { customer, email, address, items, total } = req.body;

    // Basic NoSQL Injection Prevention: Ensure types are correct and not objects
    if (
      typeof customer !== "string" ||
      typeof email !== "string" ||
      typeof address !== "string" ||
      typeof total !== "number" ||
      !Array.isArray(items)
    ) {
      return res.status(400).json({ error: "Invalid input data format" });
    }

    // In a real app, calculate total on server-side to prevent tampering
    const order = {
      customer: customer.trim(),
      email: email.trim(),
      address: address.trim(),
      items,
      total,
      status: "pending",
      createdAt: new Date(),
    };

    const db = await connectDB();
    const result = await db.collection("orders").insertOne(order);
    res.status(201).json({
      success: true,
      orderId: result.insertedId,
      message: "Order placed successfully!",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Failed to process checkout" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`E-Commerce Server running on port ${PORT}`),
);
