const express = require("express");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ userId: req.user.id, title, content });
  await note.save();
  res.json(note);
});

router.get("/", authMiddleware, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

router.put("/:id", authMiddleware, async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Note updated" });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

module.exports = router;
