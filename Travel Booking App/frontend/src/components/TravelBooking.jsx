import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation

export default function TravelBooking() {
  const navigate = useNavigate(); // Initialize navigation
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bookingStatus: "Confirmed",
    vehicleName: "",
    seatNo: "",
    travelDate: "",
    destination: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const requestData = {
      ...formData,
      age: Number(formData.age),
      seatNo: String(formData.seatNo), // Ensure seatNo is a string
    };

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation CreateBooking(
              $name: String!, 
              $age: Int!, 
              $bookingStatus: String!, 
              $vehicleName: String!, 
              $seatNo: String!, 
              $travelDate: String!, 
              $destination: String!
            ) {
              createBooking(
                name: $name,
                age: $age,
                bookingStatus: $bookingStatus,
                vehicleName: $vehicleName,
                seatNo: $seatNo,
                travelDate: $travelDate,
                destination: $destination
              ) {
                id
                name
                age
                bookingStatus
                vehicleName
                seatNo
                travelDate
                destination
              }
            }
          `,
          variables: requestData,
        }),
      });

      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const newBooking = result.data.createBooking;
      setBookings([...bookings, newBooking]); // Update state
      setFormData({
        name: "",
        age: "",
        bookingStatus: "Confirmed",
        vehicleName: "",
        seatNo: "",
        travelDate: "",
        destination: "",
      });

      // Redirect to FetchBookings after successful booking
      if(alert("Booking Saved Successfully"))
        navigate("/", { state: { newBooking } });

    } catch (error) {
      console.error("Error:", error);
      setMessage("Error booking ticket. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Travel Booking System</h1>
      {message && <p className="text-center text-red-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md grid gap-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="p-2 border rounded-md" />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="p-2 border rounded-md" />
        <input type="text" name="vehicleName" placeholder="Vehicle Name" value={formData.vehicleName} onChange={handleChange} required className="p-2 border rounded-md" />
        <input type="text" name="seatNo" placeholder="Seat No" value={formData.seatNo} onChange={handleChange} required className="p-2 border rounded-md" />
        <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} required className="p-2 border rounded-md" />
        <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required className="p-2 border rounded-md" />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700" disabled={loading}>
          {loading ? "Booking..." : "Book Ticket"}
        </button>
      </form>
    </div>
  );
}
