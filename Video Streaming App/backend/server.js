
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { GridFSBucket } = require("mongodb");

// Import Video Routes
const videoRoutes = require("./routes/videoRoutes");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/Numetry_Internship";

async function connectDB() {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Avoid indefinite waiting
    });

    console.log("✅ MongoDB Connected Successfully");
    return conn.connection.db;
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit the app if MongoDB fails
  }
}

let gridFSBucket;
connectDB().then((db) => {
  gridFSBucket = new GridFSBucket(db, { bucketName: "videos" });
  console.log("✅ GridFSBucket Initialized");

  // Pass GridFSBucket to routes after initialization
  app.use("/api", videoRoutes(gridFSBucket));
});

// 📌 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

