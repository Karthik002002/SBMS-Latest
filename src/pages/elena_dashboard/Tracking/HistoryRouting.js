import React, { useEffect, useState } from 'react';
import L, { circle } from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import RunningPNG from 'assets/img/bus-icons/bus-running-64.png';
import IdlePNG from 'assets/img/bus-icons/bus-idle-64.png';
import StoppedPNG from 'assets/img/bus-icons/bus-stopped-64.png';
import TowedPNG from 'assets/img/bus-icons/bus-towing-64.png';
import RashDrivingPNG from 'assets/img/bus-icons/bus-rashdriving-64.png';
import NoNetworkPNG from 'assets/img/bus-icons/bus-nonetwork-64.png';
import InActivePNG from 'assets/img/bus-icons/bus-inactive-64.png';
import ParkedPNG from 'assets/img/bus-icons/bus-parked-64.png';
import { useListFilterContext } from 'context/FilterContext';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
});

const HistoryRouting = React.memo(function HistoryRouting() {
  const [HistoryMarkerRawData, setHistoryMarkerRawData] = useState([]);
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

  const markerLayer = L.layerGroup().addTo(map);
  const circleLayer = L.layerGroup().addTo(map);
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
            let formattedData = [];
            data.map(data => {
              const splittedDateTime = data.datetime
                .split(',')
                .map(item => item.trim());
              const splitLocation = data.location
                .split(',')
                .map(item => item.trim());
              const lat = splitLocation[0];
              const lon = splitLocation[1];
              const date = splittedDateTime[0];
              const time = splittedDateTime[1];
              const { location, datetime, ...remainingData } = data;
              formattedData.push({
                ...remainingData,
                lat: lat,
                lon: lon,
                date: date,
                time: time
              });
            });
            setHistoryMarkerRawData(formattedData);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [HistoryTrackingURL]);
  useEffect(() => {
    if (HistoryTrackingActive) {
      if (!map) return;

      routingControl = L.Routing.control({
        waypoints: HistoryMarkerRawData.map(data => {
          return L.latLng([data.lat, data.lon]);
        }),
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: '#0380F5', opacity: 1, weight: 5 }]
        },
        show: false,
        createMarker: function (i, waypoint, n) {
          let marker;
          const data = HistoryMarkerRawData[i];
          if (i === 0) {
            marker = L.circleMarker(waypoint.latLng, {
              radius: 10,
              color: 'green'
            }).bindPopup('Starting Point');
            markerLayer.addLayer(marker);
          } else if (i === n - 1) {
            marker = L.circleMarker(waypoint.latLng, {
              radius: 10,
              color: 'red'
            }).bindPopup('Ending Point');
            markerLayer.addLayer(marker);
          } else {
            const iconUrl = data.spd_status
              ? RashDrivingPNG
              : data.status === 0
              ? RunningPNG
              : data.status === 1
              ? IdlePNG
              : data.status === 2
              ? StoppedPNG
              : data.status === 3
              ? TowedPNG
              : data.status === 4
              ? NoNetworkPNG
              : data.status === 5
              ? InActivePNG
              : ParkedPNG;
            const customIcon = L.icon({
              iconUrl: iconUrl,
              iconSize: [35, 35], // Adjust size as needed
              iconAnchor: [10, 15] // Adjust anchor point as needed
            });
            marker = L.marker(waypoint.latLng, {
              icon: customIcon
            });
            markerLayer.addLayer(marker);
          }
          marker.bindPopup(`${data.vehicle_regno}`);

          return marker;
        }
      }).addTo(map);
      markerLayer.addTo(map);
      circleLayer.addTo(map);

      return () => {
        if (map) {
          map.removeLayer(circleLayer);
          map.removeLayer(markerLayer);
          map.removeControl(routingControl);
        }
      };
    }
  }, [HistoryMarkerRawData, HistoryTrackingActive]);

  return null;
});
export default HistoryRouting;
