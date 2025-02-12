
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Blog Schema
const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
});
const Blog = mongoose.model("Blog", BlogSchema);

// Routes
app.post("/api/posts", async (req, res) => {
  try {
    const newPost = new Blog(req.body);
    await newPost.save();
    res.status(201).json({ message: "Post Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Creating Post" });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Blog.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Posts" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
