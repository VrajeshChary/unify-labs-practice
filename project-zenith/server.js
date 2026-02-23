const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Explicitly serve index.html for the root route on Vercel
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

async function connectDB() {
  await client.connect();
  db = client.db("zenith_cms");
  console.log("connected to db");
}
connectDB();

app.get("/api/posts", async (req, res) => {
  const posts = await db.collection("blogs").find().toArray();
  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  const { title, content, author, category } = req.body;
  const newPost = {
    title,
    content,
    author,
    category: category || "General",
    date: new Date(),
  };
  await db.collection("blogs").insertOne(newPost);
  res.status(201).json({ message: "post created" });
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await db
      .collection("blogs")
      .findOne({ _id: new ObjectId(id) });
    res.json(post);
  } catch (e) {
    res.status(500).json({ error: "invalid id" });
  }
});

app.patch("/api/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, author, category } = req.body;
    const updateDoc = {
      $set: { title, content, author, category },
    };
    await db
      .collection("blogs")
      .updateOne({ _id: new ObjectId(id) }, updateDoc);
    res.json({ message: "post updated" });
  } catch (e) {
    res.status(500).json({ error: "update failed" });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  await db.collection("blogs").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "post deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server running on port " + PORT));
