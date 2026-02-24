const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Configure MongoDB
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("unify_ecommerce");
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
connectDB();

// ==========================================
// API ROUTES
// ==========================================

// 1. Get all products (with optional search & category filtering)
app.get("/api/products", async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Exact match for category
    if (category && category !== "All") {
      query.category = category;
    }

    // Case-insensitive regex match for search terms in the product name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const results = await db.collection("products").find(query).toArray();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// 2. Submit a checkout order
app.post("/api/checkout", async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    // In a real app, calculate total on server-side to prevent tampering
    const order = {
      customer,
      items,
      total,
      status: "pending",
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(order);
    res.status(201).json({
      success: true,
      orderId: result.insertedId,
      message: "Order placed successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process checkout" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`E-Commerce Server running on port ${PORT}`),
);
