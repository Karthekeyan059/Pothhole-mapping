import React, { useState, useEffect } from 'react';
import axios from 'axios';  // ADD THIS
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const dummyPotholes = [
  { id: 1, lat: 13.0827, lng: 80.2707, severity: 0.45 },
  { id: 2, lat: 13.0840, lng: 80.2750, severity: 0.92 },
  { id: 3, lat: 13.0900, lng: 80.2800, severity: 0.65 },
  { id: 4, lat: 13.0950, lng: 80.2850, severity: 0.78 },
  { id: 5, lat: 13.1000, lng: 80.2900, severity: 0.35 },
  { id: 6, lat: 13.0850, lng: 80.2650, severity: 0.88 },
];

const dummyChartData = [80, 60, 90, 70, 50, 85, 65, 75, 55, 95, 40, 100];

function App() {
  const [potholes, setPotholes] = useState(dummyPotholes);
  const [chartData, setChartData] = useState(dummyChartData);
  const center = [11.916064, 79.812325];   

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchPotholes = async () => {
    try {
      const response = await axios.get(`${API_URL}/potholes`);
      setPotholes(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPotholes();  // ADD THIS: Call on load
    const interval = setInterval(fetchPotholes, 5000);  // Poll every 5s for live
    return () => clearInterval(interval);
  }, []);

  // Interval for dummy adds (keep for demo)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newPothole = {
          id: Date.now(),
          lat: center[0] + (Math.random() - 0.5) * 0.02,
          lng: center[1] + (Math.random() - 0.5) * 0.02,
          severity: Math.random(),
        };
        setPotholes(prev => [...prev, newPothole]);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getMarkerColor = (severity) => {
    if (severity > 0.8) return '#c53030';
    if (severity > 0.5) return '#e53e3e';
    return '#f56565';
  };

  const totalPotholes = potholes.length;
  const criticalPotholes = potholes.filter(p => p.severity > 0.8).length;
  const avgSeverity = totalPotholes > 0 ? (potholes.reduce((sum, p) => sum + p.severity, 0) / totalPotholes * 10).toFixed(1) : 0;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <span className="location">Chennai</span>
          <input type="text" className="search" placeholder="Search" />
        </div>
        <div className="header-right">
          <button className="icon-btn" aria-label="Notifications">🔔</button>
          <img src="https://via.placeholder.com/32x32?text=U" alt="User" className="user-avatar" />
          <button className="icon-btn" aria-label="Dark Mode">🌙</button>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
        <nav className="sidebar">
          <ul className="nav-list">
            <li className="nav-item active">
              <span className="nav-icon">📊</span>
              Dashboard
            </li>
            <li className="nav-item">
              <span className="nav-icon">📄</span>
              Reports
            </li>
            <li className="nav-item">
              <span className="nav-icon">📈</span>
              Analytics
            </li>
            <li className="nav-item">
              <span className="nav-icon">⚙️</span>
              Settings
            </li>
            <li className="nav-item">
              <span className="nav-icon">❓</span>
              Help
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          {/* Map Section */}
          <section className="map-section">
            <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {potholes.map((pothole) => (
                <CircleMarker
                  key={pothole.id}
                  center={[pothole.lat, pothole.lng]}
                  radius={pothole.severity * 10 + 5}
                  fillColor={getMarkerColor(pothole.severity)}
                  color="#ffffff"
                  weight={2}
                  opacity={0.8}
                  fillOpacity={0.6}
                />
              ))}
            </MapContainer>
          </section>

          {/* Dashboard Section */}
          <section className="dashboard-section">
            <div className="dashboard-header">
              <h2>Dashboard</h2>
              <div className="header-controls">
                <select className="control-select">
                  <option>Core mode</option>
                </select>
                <select className="control-select dark-select">
                  <option>Dark mode</option>
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Potholes Identified</h3>
                <p className="stat-number">{totalPotholes.toLocaleString()}</p>
              </div>
              <div className="stat-card critical">
                <h3>Critical Potholes</h3>
                <div className="stat-badge">🔴</div>
                <p className="stat-number">{criticalPotholes}</p>
              </div>
              <div className="stat-card">
                <h3>Average Severity</h3>
                <div className="stat-badge">📊</div>
                <p className="stat-number">{avgSeverity}/10</p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="chart-section">
              <div className="chart-header">
                <h3>Average Severity</h3>
                <select className="control-select">
                  <option>All time</option>
                </select>
              </div>
              <div className="bar-chart">
                {chartData.map((height, index) => (
                  <div
                    key={index}
                    className="bar"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="chart-x-axis">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
              <div className="chart-y-axis">
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;