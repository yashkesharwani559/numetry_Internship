const express = require("express");
const upload = require("../middleware/multer");
const Image = require("../models/image");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// 📌 Upload Image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      imageUrl: req.file.path, // Cloudinary URL
      publicId: req.file.filename, // Public ID for deletion
    });

    await newImage.save();
    res.json({ message: "Image uploaded successfully", imageUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

//  Get All Images
router.get("/images", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images", error: error.message });
  }
});

module.exports = router;
