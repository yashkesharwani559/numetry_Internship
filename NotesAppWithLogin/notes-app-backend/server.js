const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");



const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
