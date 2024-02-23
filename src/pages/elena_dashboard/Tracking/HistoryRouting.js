import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import HistoryRoutingData from '../../../data/HistoryTrackingData.json';
import { useListFilterContext } from 'context/FilterContext';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
});

const HistoryRouting = React.memo(function HistoryRouting() {
  const [HistoryMarkerRawData, setHistoryMarkerRawData] = useState([]);
  const HistoryMarkerData = [];
  const {
    HistoryTrackingActive,
    setHistoryTrackingActive,
    HistoryTrackingURL,
    setHistoryTrackingURL
  } = useListFilterContext();
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  const map = useMap();

  const customIcon = L.icon({
    // iconUrl: CustomMarker,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  const markerLayer = L.layerGroup();
  const circleLayer = L.layerGroup();
  let routingControl;
  useEffect(() => {
    if (HistoryTrackingURL !== null) {
      const fetchData = async () => {
        try {
          const response = await fetch(HistoryTrackingURL, {
            method: 'GET',
            headers: { Authorization: `token ${userToken.token}` }
          });
          if (response.status == 200) {
            const data = await response.json();
            setHistoryMarkerRawData(data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [HistoryTrackingURL]);
  useEffect(() => {
    HistoryMarkerRawData.map(content => {
      HistoryMarkerData.push(content);
    });
  }, [HistoryMarkerRawData]);
  useEffect(() => {
    if (!map) return;
    
    routingControl = L.Routing.control({
      waypoints: HistoryMarkerRawData.map(data => {
        return L.latLng([data.lat, data.lon, data]);
      }),
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: '#0380F5', opacity: 1, weight: 5 }]
      },
      show: false,
      createMarker: function (i, waypoint, n) {
        let marker;

        if (i === 0) {
          marker = L.circleMarker(waypoint.latLng, {
            radius: 10,
            color: 'green'
          }).bindPopup('Starting Point');
          markerLayer.addLayer(marker);
          // marker = L.marker(waypoint.latLng);
        } else if (i === n - 1) {
          marker = L.circleMarker(waypoint.latLng, {
            radius: 10,
            color: 'red'
          }).bindPopup('Ending Point');
          markerLayer.addLayer(marker);
          // marker = L.marker(waypoint.latLng);
        } else {
          marker = L.marker(waypoint.latLng);
          markerLayer.addLayer(marker);
        }
        marker.bindPopup(
          // `Vehicle Name : ${
          //   waypoint.latLng.data.vehicle_name
          // }<br>Lat: ${waypoint.latLng.lat.toFixed(
          //   7
          // )}<br>Lon: ${waypoint.latLng.lng.toFixed(7)}`
          `${i}`
        );

        return marker;
      }
    }).addTo(map);
    markerLayer.addTo(map);
    circleLayer.addTo(map);

    return () => {};
  }, [HistoryMarkerRawData]);

  return null;
});
export default HistoryRouting;
