const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileId: mongoose.Schema.Types.ObjectId, // GridFS File ID reference
});

// Check if the model exists before defining
const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

module.exports = Video;
