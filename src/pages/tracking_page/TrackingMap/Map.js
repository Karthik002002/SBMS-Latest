import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerComp from './Marker';
import HistoryRouting from 'pages/elena_dashboard/Tracking/HistoryRouting';
const Map = () => {
  return (
    <div>
      <MapContainer
        zoom={5}
        center={[22.026176805638872, 78.42122221495495]}
        style={{ height: '90vh', width: '100%' }}
        minZoom={3}
      >
        <TileLayer
          attribution={null}
          url={'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
        />
        <MarkerComp />
        <HistoryRouting />
      </MapContainer>
    </div>
  );
};

export default Map;
