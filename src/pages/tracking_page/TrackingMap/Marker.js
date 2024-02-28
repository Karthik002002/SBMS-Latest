import { useListFilterContext } from 'context/FilterContext';
import { divIcon } from 'leaflet';
import React, { useEffect, useState } from 'react';
import RunningPNG from 'assets/img/bus-icons/bus-running-64.png';
import IdlePNG from 'assets/img/bus-icons/bus-idle-64.png';
import StoppedPNG from 'assets/img/bus-icons/bus-stopped-64.png';
import TowedPNG from 'assets/img/bus-icons/bus-towing-64.png';
import RashDrivingPNG from 'assets/img/bus-icons/bus-rashdriving-64.png';
import NoNetworkPNG from 'assets/img/bus-icons/bus-nonetwork-64.png';
import InActivePNG from 'assets/img/bus-icons/bus-inactive-64.png';
import ParkedPNG from 'assets/img/bus-icons/bus-parked-64.png';
import { Marker, Popup, useMap } from 'react-leaflet';
import { LiveTrackingDataURL } from '../../../URL/url';
const MarkerComp = () => {
  const map = useMap();
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  const [marker, setMarker] = useState([]);
  // const [position, setPosition] = useState(null);
  const [LiveMarker, setLiveMarker] = useState({
    position: null,
    statusText: null,
    icon: null,
    vehicleData: null
  });
  const { position, statusText, icon, vehicleData } = LiveMarker;
  const {
    markerData,
    ZoomLevel,
    TrackingVehicleCenter,
    HistoryTrackingActive,
    setTrackingVehicleCenter,
    SocketLiveMarker,
    IMEI
  } = useListFilterContext();
  useEffect(() => {
    if (IMEI !== null) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${LiveTrackingDataURL}?imei=${IMEI}`, {
            method: 'GET',
            headers: { Authorization: `token ${userToken.token}` }
          });
          const data = await response.json();
          const { lat, lon, status, speed_status, speed, heading } = data;
          if (lat && lon) {
            const position = lat && lon ? [lat, lon] : null;
            const iconHtml = `<img src="${
              speed_status
                ? RashDrivingPNG
                : status === 0
                ? RunningPNG
                : status === 1
                ? IdlePNG
                : status === 2
                ? StoppedPNG
                : status === 3
                ? TowedPNG
                : status === 4
                ? NoNetworkPNG
                : status === 5
                ? InActivePNG
                : ParkedPNG
            }" style="transform: rotate(${heading}deg)" width="25" height="30" />`;
            const customMarkerIcon = divIcon({
              className: 'custom-marker-icon',
              html: iconHtml,
              iconSize: [25, 41],
              iconAnchor: [21, 36],
              popupAnchor: [1, -34]
            });
            const statusText = getStatusAndIcon(status, speed_status);
            const finalData = {
              position: position,
              statusText: statusText.statusText,
              icon: customMarkerIcon,
              vehicleData: data
            };

            map.panTo([lat, lon], 17);
            map.setView([lat, lon], 17);
            setLiveMarker(finalData);
          }
        } catch (error) {
          console.error(error);
        }
      };
      const interval = setInterval(fetchData, 5 * 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [IMEI]);

  // useEffect(() => {
  //   if (SocketLiveMarker !== null) {
  //     function getStatusAndIcon(speed, ignition) {
  //       let statusText;
  //       let icon;
  //       if (speed === 0 && ignition === 0) {
  //         statusText = 'Stopped;';
  //         icon = StoppedPNG;
  //       } else if (speed > 60 && ignition === 1) {
  //         statusText = 'RashDriving';
  //         icon = RashDrivingPNG;
  //       } else if (speed > 0 && ignition === 1) {
  //         statusText = 'Moving';
  //         icon = RunningPNG;
  //       } else if (speed === 0 && ignition === 1) {
  //         statusText = 'Idle';
  //         icon = IdlePNG;
  //       } else if (speed > 0 && ignition === 0) {
  //         statusText = 'Towed';
  //         icon = TowedPNG;
  //       }
  //       return {
  //         statusText: statusText,
  //         icon: icon
  //       };
  //     }

  //     const { speed, ignition, lat, lon, imei } = SocketLiveMarker;
  //     const IMEIData = markerData.find(data => data.imei === imei);
  //     console.log(IMEIData);
  //     const numberedLat = Number(lat);
  //     const numberedLon = Number(lon);
  //     const position = [numberedLat, numberedLon];
  //     const statusText = getStatusAndIcon(Number(speed), Number(ignition));
  //     const iconHtml = `<img src="${statusText.icon}"  width="25" height="30" />`;
  //     const customMarkerIcon = divIcon({
  //       className: 'custom-marker-icon',
  //       html: iconHtml,
  //       iconSize: [25, 41],
  //       iconAnchor: [21, 36],
  //       popupAnchor: [1, -34]
  //     });
  //     const finalData = {
  //       position: position,
  //       statusText: statusText.statusText,
  //       icon: customMarkerIcon,
  //       vehicleData: IMEIData
  //     };
  //     setLiveMarker(finalData);
  //     map.panTo([numberedLat, numberedLon], 17);
  //     map.setView([numberedLat, numberedLon], 17);
  //   }
  // }, [map, SocketLiveMarker]);

  useEffect(() => {
    if (TrackingVehicleCenter !== null && LiveMarker.position === null) {
      map.setView(TrackingVehicleCenter, 17);
      setTrackingVehicleCenter(null);
    }
  }, [map, TrackingVehicleCenter]);
  function getStatusAndIcon(status, speed_status) {
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
    const markers = [];

    markerData?.forEach(data => {
      if (data.lat && data.lon) {
        const status = getStatusAndIcon(data.status, data.speed_status);
        markers.push({
          position: [data.lat, data.lon],
          companyName: data.Company_name,
          CompanyID: data.company_id,
          SchoolID: data.school_id,
          schoolName: data.school_name,
          vehicleName: data.vehicle_name,
          VehicleReg: data.vehicle_regno,
          imei: data.imei,
          popupText: [
            {
              VehicleReg: data.vehicle_regno,
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
      }
    });
    L.Map.include({
      clearLayers: function () {
        this.eachLayer(function (layer) {
          console.log(layer);
          this.removeLayer(layer);
        }, this);
      }
    });
    setMarker(markers);
  }, [markerData]);
  return (
    <div>
      {!HistoryTrackingActive &&
        IMEI === null &&
        marker.map((marker, index) => (
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
        ))}
      {!HistoryTrackingActive && LiveMarker.position !== null && (
        <>
          <Marker position={position} icon={icon}>
            <Popup>
              <div>
                <p className="m-0 text-500">
                  Vehicle Name: {vehicleData.vehicle_name}
                </p>
                <p className="m-0 text-500">
                  Vehicle Reg: {vehicleData.reg_no}
                </p>
                <p className="m-0 text-500">Driver: {vehicleData.driver}</p>
                <p className="m-0 text-500">
                  Driver Phone: {vehicleData.driver_phone}
                </p>
                <p className="m-0 text-500">Speed: {vehicleData.speed}</p>

                <p className="m-0 text-500">Current Status: {statusText}</p>
              </div>
            </Popup>
          </Marker>
        </>
      )}
    </div>
  );
};

export default MarkerComp;
