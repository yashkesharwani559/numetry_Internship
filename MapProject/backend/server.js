const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Google Maps API Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




const axios = require("axios");

app.post("/api/get-route", async (req, res) => {
  try {
    const { origin, destination } = req.body;
    const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;

    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
      params: { origin, destination, key: googleApiKey },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching directions:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});


