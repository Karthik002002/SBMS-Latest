import React, { useContext, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerComp from './Marker';
import AppContext from 'context/Context';
import HistoryRouting from 'pages/elena_dashboard/Tracking/HistoryRouting';
import TileLayerWithFilter from './TileLayer';
const Map = () => {
  return (
    <div className="map-container">
      <MapContainer
        zoom={`${window.innerWidth < 530 ? 4   : 5}`}
        center={[22.026176805638872, 78.42122221495495]}
        style={{ height: '90vh', width: '100%' }}
        minZoom={3}
      >
        <TileLayerWithFilter />
        <MarkerComp />
        <HistoryRouting />
      </MapContainer>
    </div>
  );
};

export default Map;
