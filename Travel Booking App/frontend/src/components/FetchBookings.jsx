import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "graphql-request";
import { request } from "graphql-request";
import { FaEdit, FaTrash } from "react-icons/fa";

const graphqlEndpoint = "http://localhost:5000/graphql";

// GraphQL Queries & Mutations
const GET_BOOKINGS = gql`
  query {
    bookings {
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
`;

const DELETE_BOOKING = gql`
  mutation DeleteBooking($id: ID!) {
    deleteBooking(id: $id) {
      message
    }
  }
`;

const UPDATE_BOOKING = gql`
  mutation UpdateBooking(
    $id: ID!
    $name: String!
    $age: Int!
    $bookingStatus: String!
    $vehicleName: String!
    $seatNo: String!
    $travelDate: String!
    $destination: String!
  ) {
    updateBooking(
      id: $id
      name: $name
      age: $age
      bookingStatus: $bookingStatus
      vehicleName: $vehicleName
      seatNo: $seatNo
      travelDate: $travelDate
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
`;

export default function FetchBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();

  // Fetch Bookings
  const fetchBookings = () => {
    request(graphqlEndpoint, GET_BOOKINGS)
      .then((data) => {
        setBookings(data.bookings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Delete Booking
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await request(graphqlEndpoint, DELETE_BOOKING, { id });
        fetchBookings();
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  // Open Modify Modal
  const handleModify = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  // Handle Modify Form Submission
  const handleModifySubmit = async (e) => {
    e.preventDefault();
    try {
      const variables = {
        id: selectedBooking.id,
        name: selectedBooking.name,
        age: parseInt(selectedBooking.age, 10),
        bookingStatus: selectedBooking.bookingStatus, // Added bookingStatus
        vehicleName: selectedBooking.vehicleName,
        seatNo: selectedBooking.seatNo,
        travelDate: selectedBooking.travelDate,
        destination: selectedBooking.destination,
      };

      await request(graphqlEndpoint, UPDATE_BOOKING, variables);
      setModalOpen(false);
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

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
                <p><strong>Status:</strong> {booking.bookingStatus}</p>
                <p><strong>Vehicle:</strong> {booking.vehicleName}</p>
                <p><strong>Seat No:</strong> {booking.seatNo}</p>
                <p><strong>Travel Date:</strong> {booking.travelDate}</p>
                <p><strong>Destination:</strong> {booking.destination}</p>
                <div className="flex gap-4 mt-3">
                  <button onClick={() => handleModify(booking)} className="text-blue-500">
                    <FaEdit size={20} />
                  </button>
                  <button onClick={() => handleDelete(booking.id)} className="text-red-500">
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg">No bookings found.</p>
          )}
        </div>
      )}

      {/* Modify Modal */}
      {modalOpen && selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Modify Booking</h2>
            <form onSubmit={handleModifySubmit} className="grid gap-4">
              <input
                type="text"
                name="name"
                value={selectedBooking.name}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, name: e.target.value })}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                name="age"
                value={selectedBooking.age}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, age: Number(e.target.value) })}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                name="bookingStatus"
                value={selectedBooking.bookingStatus}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, bookingStatus: e.target.value })}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                name="vehicleName"
                value={selectedBooking.vehicleName}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, vehicleName: e.target.value })}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                name="seatNo"
                value={selectedBooking.seatNo}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, seatNo: e.target.value })}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="date"
                name="travelDate"
                value={selectedBooking.travelDate}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, travelDate: e.target.value })}
                required
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                name="destination"
                value={selectedBooking.destination}
                onChange={(e) => setSelectedBooking({ ...selectedBooking, destination: e.target.value })}
                required
                className="p-2 border rounded-md"
              />
              <div className="flex gap-4">
                <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">
                  Modify
                </button>
                <button onClick={() => setModalOpen(false)} className="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
