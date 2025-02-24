const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const Booking = require("../models/Booking");

// Define Booking Type
const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    bookingStatus: { type: GraphQLString },
    vehicleName: { type: GraphQLString },
    seatNo: { type: GraphQLString },
    travelDate: { type: GraphQLString },
    destination: { type: GraphQLString },
  }),
});

// Root Query (Fetching Bookings)
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    bookings: {
      type: new GraphQLList(BookingType),
      resolve(parent, args) {
        return Booking.find(); // Fetch all bookings
      },
    },
  },
});

// Mutations (Add Booking)
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBooking: {
      type: BookingType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        bookingStatus: { type: GraphQLString },
        vehicleName: { type: GraphQLString },
        seatNo: { type: GraphQLString },
        travelDate: { type: GraphQLString },
        destination: { type: GraphQLString },
      },
      resolve(parent, args) {
        const newBooking = new Booking(args);
        return newBooking.save();
      },
    },
  },
});

// Export Schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
