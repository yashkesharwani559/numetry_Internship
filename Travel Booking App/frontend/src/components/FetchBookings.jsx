import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "graphql-request";
import { request } from "graphql-request";

const GET_BOOKINGS = gql`
  query {
    bookings {
      id
      name
      age
      vehicleName
      seatNo
      travelDate
      destination
    }
  }
`;

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const graphqlEndpoint = "http://localhost:5000/graphql";

  useEffect(() => {
    request(graphqlEndpoint, GET_BOOKINGS)
      .then((data) => {
        setBookings(data.bookings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">All Bookings</h1>
      <button
        onClick={() => navigate("/book-tickets")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go to Ticket Booking
      </button>
      {loading ? (
        <p className="text-center text-lg">Loading bookings...</p>
      ) : (
        <div className="grid gap-4">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition">
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Age:</strong> {booking.age}</p>
                <p><strong>Vehicle:</strong> {booking.vehicleName}</p>
                <p><strong>Seat No:</strong> {booking.seatNo}</p>
                <p><strong>Travel Date:</strong> {booking.travelDate}</p>
                <p><strong>Destination:</strong> {booking.destination}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-lg">No bookings found.</p>
          )}
        </div>
      )}
    </div>
  );
}
