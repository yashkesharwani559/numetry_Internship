const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
});

module.exports = mongoose.model("Note", NoteSchema);
