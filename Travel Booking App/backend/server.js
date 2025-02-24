require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const { buildSchema } = require("graphql");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define Mongoose Schema & Model
const bookingSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bookingStatus: String,
  vehicleName: String,
  seatNo: String,
  travelDate: String,
  destination: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

// Define GraphQL Schema
const schema = buildSchema(`
  type Booking {
    id: ID!
    name: String!
    age: Int!
    bookingStatus: String!
    vehicleName: String!
    seatNo: String!
    travelDate: String!
    destination: String!
  }

  type Query {
    bookings: [Booking]
  }

  type Mutation {
    createBooking(
      name: String!,
      age: Int!,
      bookingStatus: String!,
      vehicleName: String!,
      seatNo: String!,
      travelDate: String!,
      destination: String!
    ): Booking
  }
`);

// Define Resolvers
const root = {
  bookings: async () => await Booking.find(),
  createBooking: async ({ name, age, bookingStatus, vehicleName, seatNo, travelDate, destination }) => {
    const newBooking = new Booking({ name, age, bookingStatus, vehicleName, seatNo, travelDate, destination });
    await newBooking.save();
    return newBooking;
  },
};

// GraphQL Endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // GraphQL playground
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
