import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getDistance } from "geolib";

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Function to Fetch Coordinates from City Name
const getCoordinates = async (place) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`);
    const data = await response.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    } else {
      alert("Location not found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [distance, setDistance] = useState(null);

  // Get User's Current Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  // Handle Destination Input Change
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  // Calculate Distance & Fetch Coordinates
  const calculateDistance = async () => {
    if (currentLocation && destination) {
      const coords = await getCoordinates(destination);
      if (coords) {
        setDestinationCoords(coords);
        const dist = getDistance(currentLocation, coords) / 1000; // Convert to km
        setDistance(dist.toFixed(2));
      }
    }
  };

  // Swap Locations
  const swapLocations = () => {
    setDestinationCoords(currentLocation);
    setCurrentLocation(destinationCoords);
  };

  return (
    <div>
      <h1>OpenStreetMap in React</h1>
      <h2>Find Route & Distance</h2>

      <div>
        <label>From (Current Location): </label>
        <input
          type="text"
          value={currentLocation ? `${currentLocation.lat}, ${currentLocation.lng}` : "Fetching location..."}
          readOnly
        />

        <button onClick={swapLocations}>Swap</button>

        <label> To (Destination): </label>
        <input
          type="text"
          placeholder="Enter City or Area"
          value={destination}
          onChange={handleDestinationChange}
        />

        <button onClick={calculateDistance}>Calculate Distance</button>
      </div>

      <p>Distance: {distance ? `${distance} km` : "N/A"}</p>

      {currentLocation && destinationCoords && (
        <MapContainer center={currentLocation} zoom={6} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={currentLocation} icon={customIcon}>
            <Popup>Current Location</Popup>
          </Marker>

          <Marker position={destinationCoords} icon={customIcon}>
            <Popup>Destination: {destination}</Popup>
          </Marker>

          <Polyline positions={[currentLocation, destinationCoords]} color="blue" />
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
