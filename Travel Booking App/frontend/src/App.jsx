import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TravelBooking from "./components/TravelBooking";
import FetchBooking from "./components/FetchBookings";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-center mb-6">Travel Booking System</h1>
        <Routes>
          <Route path="/book-tickets" element={<TravelBooking />} />
          <Route path="/" element={<FetchBooking />} />
        </Routes>
      </div>
    </Router>
  );
}
