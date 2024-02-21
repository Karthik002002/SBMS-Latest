import React, { useState, useContext, useEffect, memo } from 'react';
import { recentPurchaseTableData } from 'data/dashboard/ecom';
import { useParams } from 'react-router-dom';
// import FalconComponentCard from 'components/common/FalconComponentCard';
import L from 'leaflet';
import 'leaflet.tilelayer.colorfilter';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Tooltip,
  Popup,
  LayerGroup,
  Circle
} from 'react-leaflet';
import AppContext from 'context/Context';
import 'leaflet-rotatedmarker';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { divIcon } from 'leaflet';
import RunningPNG from 'assets/img/bus-icons/bus-running-64.png';
import IdlePNG from 'assets/img/bus-icons/bus-idle-64.png';
import StoppedPNG from 'assets/img/bus-icons/bus-stopped-64.png';
import TowedPNG from 'assets/img/bus-icons/bus-towing-64.png';
import RashDrivingPNG from 'assets/img/bus-icons/bus-rashdriving-64.png';
import NoNetworkPNG from 'assets/img/bus-icons/bus-nonetwork-64.png';
import InActivePNG from 'assets/img/bus-icons/bus-inactive-64.png';
import ParkedPNG from 'assets/img/bus-icons/bus-parked-64.png';
import { useListFilterContext } from 'context/FilterContext';
import HistoryRouting from 'pages/elena_dashboard/Monitoring/HistoryRouting';
import VehicleMarker from './MarkerComponent';
import { TrackingURL } from '../../URL/url';

const LeafletMapExample = ({ data }) => {
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  const [LiveVehicleData, setLiveVehicleData] = useState([]);
  const [UpdatedDashboard, setUpdatedDashboard] = useState();
  const [DashboardData, setDashBoardData] = useState(data);
  const { TrackingVehicleCenter, ZoomLevel, IMEI, HistoryTrackingActive } =
    useListFilterContext();

  useEffect(() => {
    if (IMEI !== null && !HistoryTrackingActive) {
      const LiveURL = `${TrackingURL}?imei=${IMEI}`;
      const fetchData = async () => {
        try {
          const response = await fetch(LiveURL, {
            method: 'GET',
            headers: { Authorization: `token ${userToken.token}` }
          });
          if (response.status == 200) {
            const data = await response.json();
            setLiveVehicleData(data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
      const IntervalCall = setInterval(() => {
        fetchData();
      }, 5000);
      return () => clearInterval(IntervalCall);
    }
  }, [IMEI, HistoryTrackingActive]);

  useEffect(() => {
    setDashBoardData(UpdatedDashboard);
  }, [UpdatedDashboard]);

  function LayerComponent() {
    const map = useMap();
    const { config } = useContext(AppContext);
    const { isDark } = config;

    const {
      config: { currentVehicle }
    } = useContext(AppContext);

    var myPositionMarker = null;
    const filter = isDark
      ? [
          'invert:98%',
          'grayscale:69%',
          'bright:99%',
          'contrast:111%',
          'hue:203deg',
          'saturate:1000%'
        ]
      : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%'];

    useEffect(() => {
      map.invalidateSize();
    }, [config]);

    useEffect(() => {
      if (map) {
        L.tileLayer
          .colorFilter(
            'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            {
              attribution: null,
              transparent: true,
              filter: filter
            }
          )
          .addTo(map);
      }
    }, [isDark]);

    return (
      <>
        <TileLayer
          attribution={null}
          url={'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
        />
        {HistoryTrackingActive && <HistoryRouting />}
      </>
    );
  }

  function getStatusAndIcon(status, speed_status) {
    // console.log(speed_status);
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
    if (speed_status) {
      statusText = 'RashDriving';
    }
    return {
      statusText: statusText
    };
  }
  useEffect(() => {
    // if (IMEI !== null) {
    //   const filteredLiveVehicle = data.filter(vehicle => vehicle.imei !== IMEI);
    //   setDashBoardData(filteredLiveVehicle);
    // } else {
    // }

    if (!HistoryTrackingActive) {
      setDashBoardData(data);
    }
  }, [data]);

  function LeafletMap() {
    const markers = [];

    DashboardData?.forEach(data => {
      const status = getStatusAndIcon(data.status, data.speed_status);
      markers.push({
        position: [data.lat, data.lon],
        companyName: data.Company_name,
        CompanyID: data.company_id,
        SchoolID: data.school_id,
        schoolName: data.school_name,
        vehicleName: data.vehicle_name,
        VehicleReg: data.vehicle_reg,
        imei: data.imei,
        popupText: [
          {
            VehicleReg: data.vehicle_reg,
            vehicleName: data.vehicle_name,
            driver: data.driver,
            driverPhone: data.phone,
            status: status?.statusText
          }
        ],
        markerIcons: divIcon({
          className: 'custom-marker-icon',
          html: `<img src="${
            data.speed_status
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
              : ParkedPNG
          }" style="transform: rotate(${
            data.heading
          }deg)" width="20" height="30" />`,
          iconSize: [25, 41],
          iconAnchor: [21, 36],
          popupAnchor: [1, -34]
        })
      });
    });
    return (
      <div className="map-container">
        <MapContainer
          zoom={ZoomLevel}
          // minZoom={isRTL ? 1.8 : 1.1}
          // zoomSnap={}

          scrollWheelZoom={data ? true : false}
          zoomControl={data ? true : false}
          dragging={data ? true : false}
          doubleClickZoom={data ? true : false}
          center={
            TrackingVehicleCenter
              ? TrackingVehicleCenter
              : [13.422925089909123, 77.9857877043398]
          }
          // center={position}
          radius={200}
          style={{ height: '90vh', width: '100%' }}
        >
          {!HistoryTrackingActive &&
            markers.map((marker, index) => (
              <>
                <Marker
                  key={index}
                  position={marker.position}
                  icon={marker.markerIcons}
                >
                  <Popup>
                    <p className="m-0 text-500">
                      {/* Location: {marker.position[0]}, {marker.position[1]} */}
                    </p>
                    {marker.popupText.map((item, innerIndex) => (
                      <div key={innerIndex}>
                        <p className="m-0 text-500">
                          Vehicle Name: {item.vehicleName}
                        </p>
                        <p className="m-0 text-500">
                          Vehicle Reg No: {item.VehicleReg}
                        </p>
                        <p className="m-0 text-500">Status: {item.status}</p>
                      </div>
                    ))}
                  </Popup>
                </Marker>
                <LayerGroup>
                  {/* <Circle
                  center={marker.geoFence}
                  center={[data.geofence_lat, data.geofence_lat ]}
                  pathOptions={marker.options}
                  radius={100}
                /> */}
                </LayerGroup>
              </>
            ))}

          <LayerComponent />
        </MapContainer>
      </div>
    );
  }

  return <LeafletMap />;
};

export default memo(LeafletMapExample);
