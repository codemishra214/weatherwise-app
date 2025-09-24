import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './WeatherMap.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const WeatherMap = ({ onMapClick, initialPosition }) => {
  return (
    <div className="map-page-container">
      <div className="map-card">
        <h3 className="map-title">Find on Map</h3>
        <p className="map-subtitle">Click anywhere on the map to get weather for that location.</p>
        <div className="map-wrapper">
          <MapContainer
            center={initialPosition || [20.5937, 78.9629]}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {initialPosition && <Marker position={initialPosition} />}
            <MapClickHandler onMapClick={onMapClick} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;