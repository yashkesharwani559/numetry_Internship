const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bookingStatus: String,
  vehicleName: String,
  seatNo: String,
  travelDate: String,
  destination: String,
});

module.exports = mongoose.model("Booking", BookingSchema);
