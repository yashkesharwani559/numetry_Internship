const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup (stores file temporarily)
const upload = multer({ dest: "uploads/" });

// Blog Schema
const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String, // Store Cloudinary URL
});
const Blog = mongoose.model("Blog", BlogSchema);

// Route: Create a Blog Post with Image Upload
app.post("/api/posts", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    fs.unlinkSync(req.file.path);

    // Create a new blog post with Cloudinary image URL
    const newPost = new Blog({
      title: req.body.title,
      description: req.body.description,
      imageUrl: result.secure_url,
    });

    await newPost.save();
    res.status(201).json({ message: "Post Created Successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Error Creating Post", error: error.message });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Blog.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Posts", error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));



// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // Blog Schema
// const BlogSchema = new mongoose.Schema({
//   title: String,
//   description: String,
// });
// const Blog = mongoose.model("Blog", BlogSchema);

// // Routes
// app.post("/api/posts", async (req, res) => {
//   try {
//     const newPost = new Blog(req.body);
//     await newPost.save();
//     res.status(201).json({ message: "Post Created Successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error Creating Post" });
//   }
// });

// app.get("/api/posts", async (req, res) => {
//   try {
//     const posts = await Blog.find();
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ message: "Error Fetching Posts" });
//   }
// });

// app.listen(5000, () => console.log("Server running on port 5000"));
