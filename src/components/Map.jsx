import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import gpsData from '../utils/Data';


const calculateStoppagePoints = (gpsData) => {
  const stoppagePoints = [];
  let startStoppageIndex = -1;

  for (let i = 0; i < gpsData.length - 1; i++) {
    const currentEntry = gpsData[i];
    const nextEntry = gpsData[i + 1];

    if (currentEntry.speed === 0 && startStoppageIndex === -1) {
      // Start of stoppage
      startStoppageIndex = i;
    } else if (currentEntry.speed > 0 && startStoppageIndex !== -1) {
      // End of stoppage
      const stoppageTime = nextEntry.eventGeneratedTime - gpsData[startStoppageIndex].eventGeneratedTime;
      const reachTime = new Date(gpsData[startStoppageIndex].eventGeneratedTime).toLocaleString();
      const leaveTime = new Date(nextEntry.eventGeneratedTime).toLocaleString();
      
      stoppagePoints.push({
        latitude: gpsData[startStoppageIndex].latitude,
        longitude: gpsData[startStoppageIndex].longitude,
        stoppageTime: Math.round(stoppageTime / 60000),
        reachTime: reachTime,
        leaveTime: leaveTime
      });

      startStoppageIndex = -1; // Reset start index
    }
  }

  return stoppagePoints;
};


const generateMarkerColors = (stoppagePoints) => {
  const colors = {};
  stoppagePoints.forEach((point, index) => {
    colors[`${point.latitude}-${point.longitude}`] = getRandomColor();
  });
  return colors;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState({ latitude: null, longitude: null });
  const [threshold, setThreshold] = useState(0);
  const [markerColors, setMarkerColors] = useState({});
  const center = [13, 74.9173533];
  const pathCoordinates = gpsData.map(data => [data.latitude, data.longitude]);
  const stoppagePoints = calculateStoppagePoints(gpsData);

  useEffect(() => {
    setMarkerColors(generateMarkerColors(stoppagePoints));
  }, []); // Run once on initial render

  const handleRowClick = (latitude, longitude) => {
    setSelectedMarker({ latitude, longitude });
  };

  const handleThresholdChange = (e) => {
    setThreshold(Number(e.target.value));
  };

  const filteredStoppagePoints = stoppagePoints.filter(point => point.stoppageTime >= threshold);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
      <MapContainer center={center} zoom={13} style={{ height: "50vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredStoppagePoints.map((point, index) => (
     <Marker 
     key={index} 
     position={[point.latitude, point.longitude]} 
     icon={L.divIcon({ 
       className: 'custom-marker', 
       html: `<div style="background-color: ${selectedMarker.latitude === point.latitude && selectedMarker.longitude === point.longitude ? 'red' : markerColors[`${point.latitude}-${point.longitude}`]}; width: 20px; height: 20px; border-radius: ${selectedMarker.latitude === point.latitude && selectedMarker.longitude === point.longitude ? '0' : '50%'}; transform: scale(${selectedMarker.latitude === point.latitude && selectedMarker.longitude === point.longitude ? '1.2' : '1'});"></div>` 
     })}
   >
     <Popup>
       Stoppage Time: <b style={{color: 'red'}}>{point.stoppageTime} minutes</b>
       <br />
       Reach Time : {point.reachTime}
       <br />
       Leave Time : {point.leaveTime}
       <br />
       Latitude: {point.latitude}
       <br />
       Longitude: {point.longitude}
     </Popup>
   </Marker>
   
        ))}
        <Polyline pathOptions={{ color: 'blue' }} positions={pathCoordinates} />
      </MapContainer>
      <div style={{ display: 'flex', padding: '20px', width: '50%' }}>
        <div style={{ flex: 1 }}>
          <h2>Stoppage Points Information</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>No</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Latitude</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Longitude</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stoppage Time (minutes)</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Reach Time</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Leave Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredStoppagePoints.map((point, index) => (
                <tr 
                  key={index} 
                  style={{ 
                    backgroundColor: selectedMarker.latitude === point.latitude && selectedMarker.longitude === point.longitude ? '#d8ff79' : 'transparent', 
                    cursor: 'pointer',
                    transition: 'transform 0.3s'
                  }}
                  onClick={() => handleRowClick(point.latitude, point.longitude)}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.latitude}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.longitude}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.stoppageTime}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.reachTime}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.leaveTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginLeft: '20px', flexShrink: 0 }}>
          <h2>Threshold Minutes</h2>
          <input 
            type="number" 
            value={threshold} 
            onChange={handleThresholdChange} 
            style={{ padding: '10px', fontSize: '16px', width: '100%' }} 
            placeholder="Enter threshold Value" 
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
