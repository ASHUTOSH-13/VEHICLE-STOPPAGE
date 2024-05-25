// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import gpsData from '../utils/Data';

// const calculateStoppagePoints = (gpsData) => {
//   const stoppagePoints = [];
//   let i = 0;

//   while (i < gpsData.length - 1) {
//     const currentEntry = gpsData[i];

//     if (currentEntry.speed === 0) {
//       let nextNonZeroSpeedEntryIndex = i + 1;
//       while (nextNonZeroSpeedEntryIndex < gpsData.length && gpsData[nextNonZeroSpeedEntryIndex].speed === 0) {
//         nextNonZeroSpeedEntryIndex++;
//       }

//       if (nextNonZeroSpeedEntryIndex < gpsData.length) {
//         const nextNonZeroSpeedEntry = gpsData[nextNonZeroSpeedEntryIndex];
//         const stoppageTime = nextNonZeroSpeedEntry.eventGeneratedTime - currentEntry.eventGeneratedTime;
//         const reachTime = new Date(currentEntry.eventGeneratedTime).toLocaleString();
//         const leaveTime = new Date(nextNonZeroSpeedEntry.eventGeneratedTime).toLocaleString();
//         stoppagePoints.push({
//           latitude: currentEntry.latitude,
//           longitude: currentEntry.longitude,
//           stoppageTime: Math.round(stoppageTime / 60000),
//           reachTime: reachTime,
//           leaveTime: leaveTime,
//           color: 'red' // Keep the color consistent for now
//         });

//         i = nextNonZeroSpeedEntryIndex; // Move to the next non-zero speed entry
//       } else {
//         break; // If no non-zero speed entry is found, exit the loop
//       }
//     } else {
//       i++;
//     }
//   }

//   return stoppagePoints;
// };

// const Map = () => {
//   const [selectedMarker, setSelectedMarker] = useState({ latitude: null, longitude: null });
//   const [threshold, setThreshold] = useState(0);
//   const center = [13, 74.9173533];
//   const pathCoordinates = gpsData.map(data => [data.latitude, data.longitude]);
//   const stoppagePoints = calculateStoppagePoints(gpsData);

//   const handleRowClick = (latitude, longitude) => {
//     setSelectedMarker({ latitude, longitude });
//   };

//   const handleThresholdChange = (e) => {
//     setThreshold(Number(e.target.value));
//   };

//   const filteredStoppagePoints = stoppagePoints.filter(point => point.stoppageTime >= threshold);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
//       <MapContainer center={center} zoom={13} style={{ height: "50vh", width: "100%" }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {filteredStoppagePoints.map((point, index) => (
//           <Marker 
//             key={index} 
//             position={[point.latitude, point.longitude]} 
//             icon={L.divIcon({ 
//               className: 'custom-marker', 
//               html: `<div style="background-color: ${selectedMarker.latitude === point.latitude && selectedMarker.longitude === point.longitude ? 'yellow' : point.color}; width: 20px; height: 20px; border-radius: 50%;"></div>` 
//             })}
//           >
//             <Popup>
//               Stoppage Time: <b style={{color: 'red'}}>{point.stoppageTime} minutes</b>
//               <br />
//               Reach Time : {point.reachTime}
//               <br />
//               Leave Time : {point.leaveTime}
//               <br />
//               Latitude: {point.latitude}
//               <br />
//               Longitude: {point.longitude}
//             </Popup>
//           </Marker>
//         ))}
//         <Polyline pathOptions={{ color: 'blue' }} positions={pathCoordinates} />
//       </MapContainer>
//       <div style={{ display: 'flex', padding: '20px', width: '50%' }}>
//         <div style={{ flex: 1 }}>
//           <h2>Stoppage Points Information</h2>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr>
//                 <th style={{ border: '1px solid #ddd', padding: '8px' }}>Latitude</th>
//                 <th style={{ border: '1px solid #ddd', padding: '8px' }}>Longitude</th>
//                 <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stoppage Time (minutes)</th>
//                 <th style={{ border: '1px solid #ddd', padding: '8px' }}>Reach Time</th>
//                 <th style={{ border: '1px solid #ddd', padding: '8px' }}>Leave Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStoppagePoints.map((point, index) => (
//                 <tr 
//                   key={index} 
//                   style={{ 
//                     backgroundColor: selectedMarker.latitude === point.latitude && selectedMarker.longitude === point.longitude ? '#f0f0f0' : 'transparent', 
//                     cursor: 'pointer',
//                     transition: 'transform 0.3s'
//                   }}
//                   onClick={() => handleRowClick(point.latitude, point.longitude)}
//                   onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
//                   onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
//                 >
//                   <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.latitude}</td>
//                   <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.longitude}</td>
//                   <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.stoppageTime}</td>
//                   <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.reachTime}</td>
//                   <td style={{ border: '1px solid #ddd', padding: '8px' }}>{point.leaveTime}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div style={{ marginLeft: '20px', flexShrink: 0 }}>
//           <h2>Threshold Minutes</h2>
//           <input 
//             type="number" 
//             value={threshold} 
//             onChange={handleThresholdChange} 
//             style={{ padding: '10px', fontSize: '16px', width: '100%' }} 
//             placeholder="Enter threshold Value" 
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Map;




import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import gpsData from '../utils/Data';

const calculateStoppagePoints = (gpsData) => {
  const stoppagePoints = [];
  let i = 0;

  while (i < gpsData.length - 1) {
    const currentEntry = gpsData[i];

    if (currentEntry.speed === 0) {
      let nextNonZeroSpeedEntryIndex = i + 1;
      while (nextNonZeroSpeedEntryIndex < gpsData.length && gpsData[nextNonZeroSpeedEntryIndex].speed === 0) {
        nextNonZeroSpeedEntryIndex++;
      }

      if (nextNonZeroSpeedEntryIndex < gpsData.length) {
        const nextNonZeroSpeedEntry = gpsData[nextNonZeroSpeedEntryIndex];
        const stoppageTime = nextNonZeroSpeedEntry.eventGeneratedTime - currentEntry.eventGeneratedTime;
        const reachTime = new Date(currentEntry.eventGeneratedTime).toLocaleString();
        const leaveTime = new Date(nextNonZeroSpeedEntry.eventGeneratedTime).toLocaleString();
        stoppagePoints.push({
          latitude: currentEntry.latitude,
          longitude: currentEntry.longitude,
          stoppageTime: Math.round(stoppageTime / 60000),
          reachTime: reachTime,
          leaveTime: leaveTime
        });

        i = nextNonZeroSpeedEntryIndex; // Move to the next non-zero speed entry
      } else {
        break; // If no non-zero speed entry is found, exit the loop
      }
    } else {
      i++;
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
                    backgroundColor: selectedMarker.latitude === point.latitude && selectedMarker.longitude === point.longitude ? '#f0f0f0' : 'transparent', 
                    cursor: 'pointer',
                    transition: 'transform 0.3s'
                  }}
                  onClick={() => handleRowClick(point.latitude, point.longitude)}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
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
