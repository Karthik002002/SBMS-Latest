import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import HistoryRoutingData from '../../../data/HistoryTrackingData.json';
// import CustomMarker from "./map-marker.png";
L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
});

export default function HistoryRouting() {
  const HistoryMarkerData = [];
  const map = useMap();
  const customIcon = L.icon({
    // iconUrl: CustomMarker,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
  HistoryRoutingData.map(content => {
    HistoryMarkerData.push(content);
  });

  useEffect(() => {
    if (!map) return;
    console.log(
      HistoryMarkerData.map(data => {
        return L.latLng([data.lat, data.lon]);
      })
    );
    const markerLayer = L.layerGroup();
    const circleLayer = L.layerGroup();

    const routingControl = L.Routing.control({
      waypoints: HistoryMarkerData.map(data => {
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
          marker = L.marker(waypoint.latLng);
        } else if (i === n - 1) {
          marker = L.circleMarker(waypoint.latLng, {
            radius: 10,
            color: 'red'
          }).bindPopup('Ending Point');
          markerLayer.addLayer(marker);
          marker = L.marker(waypoint.latLng);
        } else {
          marker = L.marker(waypoint.latLng);
        }
        marker.bindPopup(
          `Vehicle Name : ${
            waypoint.latLng.data.vehicle_name
          }<br>Lat: ${waypoint.latLng.lat.toFixed(
            7
          )}<br>Lon: ${waypoint.latLng.lng.toFixed(7)}`
        );

        return marker;
      }
    }).addTo(map);
    markerLayer.addTo(map);
    circleLayer.addTo(map);

    // console.log(waypointData);
    return () => {
      //   Check if the control exists before trying to remove it
      if (markerLayer) {
        map.removeLayer(markerLayer);
      }
      if (routingControl) {
        routingControl.setWaypoints([]); // Clear waypoints
        routingControl.createAlternativesContainer();
        map.removeControl(routingControl);
      }
      if (circleLayer) {
        map.removeLayer(circleLayer);
      }
    };
  }, [map]);

  return null;
}
