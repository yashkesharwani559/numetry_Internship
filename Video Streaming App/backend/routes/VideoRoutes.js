const express = require("express");
const mongoose = require("mongoose");
const Busboy = require("busboy");
const Video = require("../models/Video");

module.exports = (gridFSBucket) => {
  const router = express.Router();

  // 📌 Upload Video API
  router.post("/upload", async (req, res) => {
    try {
      if (!gridFSBucket) return res.status(500).json({ message: "GridFS is not initialized" });

      let busboy = new Busboy({ headers: req.headers });
      let videoTitle, videoDescription;

      busboy.on("field", (fieldname, value) => {
        if (fieldname === "title") videoTitle = value;
        if (fieldname === "description") videoDescription = value;
      });

      busboy.on("file", (fieldname, file, info) => {
        const { filename, mimeType } = info;
        const uploadStream = gridFSBucket.openUploadStream(filename, { contentType: mimeType });

        file.pipe(uploadStream);

        uploadStream.on("finish", async () => {
          const newVideo = new Video({
            title: videoTitle || "Untitled",
            description: videoDescription || "No description",
            fileId: uploadStream.id,
          });

          await newVideo.save();
          res.status(201).json({ message: "✅ Video uploaded successfully!", videoId: uploadStream.id });
        });

        uploadStream.on("error", (err) => {
          console.error("❌ Upload Stream Error:", err);
          res.status(500).json({ message: "Error uploading video" });
        });
      });

      req.pipe(busboy);
    } catch (error) {
      console.error("❌ Upload Error:", error);
      res.status(500).json({ message: "Error uploading video" });
    }
  });

  router.get("/api/video/:id", async (req, res) => {
    try {
      if (!gridFSBucket) return res.status(500).json({ message: "GridFS is not initialized" });
  
      const fileId = new mongoose.Types.ObjectId(req.params.id);
  
      // Check if the file exists in GridFS
      const file = await gridFSBucket.find({ _id: fileId }).toArray();
      if (!file.length) {
        return res.status(404).json({ message: "Video file not found in GridFS" });
      }
  
      // Stream the video if it exists
      const downloadStream = gridFSBucket.openDownloadStream(fileId);
      res.set("Content-Type", "video/mp4");
      downloadStream.pipe(res);
    } catch (error) {
      console.error("❌ Video Fetch Error:", error);
      res.status(500).json({ message: "Error fetching video" });
    }
  });
  

  // 📌 Get All Videos API
  router.get("/videos", async (req, res) => {
    try {
      const videos = await Video.find().select("title description fileId");

      if (!videos.length) {
        return res.status(404).json({ message: "No videos found" });
      }

      res.status(200).json(videos);
    } catch (error) {
      console.error("❌ Error fetching videos:", error);
      res.status(500).json({ message: "Error fetching videos" });
    }
  });

  // 📌 Delete Video API
  router.delete("/video/:id", async (req, res) => {
    try {
      const fileId = new mongoose.Types.ObjectId(req.params.id);

      // Delete from GridFS
      await gridFSBucket.delete(fileId);
      // Delete metadata from MongoDB
      await Video.findOneAndDelete({ fileId });

      res.status(200).json({ message: "✅ Video deleted successfully" });
    } catch (error) {
      console.error("❌ Error deleting video:", error);
      res.status(500).json({ message: "Error deleting video" });
    }
  });

  // 📌 Update Video API
  router.put("/video/:id", async (req, res) => {
    try {
      const { title, description } = req.body;
      const fileId = new mongoose.Types.ObjectId(req.params.id);
      console.log(fileId)

      const updatedVideo = await Video.findOneAndUpdate(
        { fileId },
        { title, description },
        { new: true }
      );

      if (!updatedVideo) {
        return res.status(404).json({ message: "Video not found" });
      }

      res.status(200).json({ message: "✅ Video updated successfully", updatedVideo });
    } catch (error) {
      console.error("❌ Error updating video:", error);
      res.status(500).json({ message: "Error updating video" });
    }
  });

  return router;
};
