require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);

const MessageSchema = new mongoose.Schema({
  phoneNumber: String,
  message: String,
});

const Message = mongoose.model("Message", MessageSchema);

// Twilio Config
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/send-message", async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Save to database
    const newMessage = new Message({ phoneNumber, message });
    await newMessage.save();

    // Send SMS via Twilio
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: "+91" + phoneNumber,
    });

    res.json({ success: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
