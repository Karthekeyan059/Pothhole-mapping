import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css'; 
import './App.css'; 

function App() {
  const [potholes, setPotholes] = useState([]);
  const center = [11.916064, 79.812325]; 

  useEffect(() => {
    fetchPotholes();
    const interval = setInterval(fetchPotholes, 5000);  
    return () => clearInterval(interval);
  }, []);

  const fetchPotholes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/potholes');
      setPotholes(response.data);
    } catch (error) {
      console.error('Error fetching potholes:', error);
    }
  };

  const getCircleOptions = (severity) => {
    const radius = severity > 0.8 ? 50 : severity > 0.5 ? 30 : 10;  
    const color = severity > 0.8 ? '#8B0000' : severity > 0.5 ? '#FF4500' : '#FF0000'; // Dark red > orange > red
    const opacity = severity;  
    return { radius, color, fillOpacity: opacity, weight: 2 };
  };

  return (
    <div className="App">
      <h1>Road Pothole Mapper</h1>
      <p>Live detections from Raspberry Pi + YOLO (Demo Mode)</p>
      <MapContainer center={center} zoom={13} style={{ height: '70vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {potholes.map((pothole, index) => (
          <Circle
            key={index}
            center={[pothole.lat, pothole.lng]}
            {...getCircleOptions(pothole.severity)}
            popup={`Severity: ${(pothole.severity * 100).toFixed(0)}%`}
          />
        ))}
      </MapContainer>
      <button onClick={fetchPotholes}>Refresh Map</button>
    </div>
  );
}

export default App;