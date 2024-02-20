import RunningPNG from 'assets/img/bus-icons/bus-running-64.png';
import IdlePNG from 'assets/img/bus-icons/bus-idle-64.png';
import StoppedPNG from 'assets/img/bus-icons/bus-stopped-64.png';
import TowedPNG from 'assets/img/bus-icons/bus-towing-64.png';
import RashDrivingPNG from 'assets/img/bus-icons/bus-rashdriving-64.png';
import NoNetworkPNG from 'assets/img/bus-icons/bus-nonetwork-64.png';
import InActivePNG from 'assets/img/bus-icons/bus-inactive-64.png';
import ParkedPNG from 'assets/img/bus-icons/bus-parked-64.png';
import { divIcon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
const VehicleMarker = ({ vehicle }) => {
  const status = getStatusAndIcon(vehicle.status, vehicle.speed_status);
  console.log('IN');
  const markerIcon = divIcon({
    className: 'custom-marker-icon',
    html: `<img src="${
      vehicle.speed_status
        ? RashDrivingPNG
        : vehicle.status === 0
        ? RunningPNG
        : vehicle.status === 1
        ? IdlePNG
        : vehicle.status === 2
        ? StoppedPNG
        : vehicle.status === 3
        ? TowedPNG
        : vehicle.status === 4
        ? NoNetworkPNG
        : vehicle.status === 5
        ? InActivePNG
        : ParkedPNG
    }" style="transform: rotate(${
      vehicle.heading
    }deg)" width="30" height="40" />`,
    iconSize: [25, 41],
    iconAnchor: [21, 36],
    popupAnchor: [1, -34]
  });

  return (
    <Marker position={[vehicle.lat, vehicle.lon]} icon={markerIcon}>
      <Popup>
        <p className="m-0 text-500">Vehicle Name: {vehicle.vehicle_name}</p>
        <p className="m-0 text-500">Vehicle Reg No: {vehicle.reg_no}</p>
        <p className="m-0 text-500">Status: {status.statusText}</p>
      </Popup>
    </Marker>
  );
};

const getStatusAndIcon = (status, speedStatus) => {
  let statusText;

  switch (status) {
    case 0:
      statusText = 'Running';
      break;
    case 1:
      statusText = 'Idle';
      break;
    case 2:
      statusText = 'Stopped';
      break;
    case 3:
      statusText = 'Towed';
      break;
    case 4:
      statusText = 'No Data';
      break;
    case 5:
      statusText = 'Out of Network';
      break;
    case 6:
      statusText = 'Parked';
      break;
    default:
      statusText = '-';
  }

  if (speedStatus) {
    statusText = 'RashDriving';
  }

  return { statusText };
};

export default VehicleMarker;
