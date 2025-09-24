import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';
import 'leaflet-geosearch/dist/geosearch.css'; // This is the required line

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/weather" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;