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
const MarkerComp = () => {
  const map = useMap();

  const [marker, setMarker] = useState([]);
  const [position, setPosition] = useState(null);

  const {
    markerData,
    ZoomLevel,
    TrackingVehicleCenter,
    HistoryTrackingActive,
    SocketLiveMarker
  } = useListFilterContext();
  useEffect(() => {
    if (SocketLiveMarker !== null) {
    //   setPosition([SocketLiveMarker[2], SocketLiveMarker[3]]);
    }
  }, [SocketLiveMarker]);
  useEffect(() => {
    if (ZoomLevel !== null && TrackingVehicleCenter !== null) {
      map.setZoom(ZoomLevel);
      map.panTo(TrackingVehicleCenter);
    }
  }, [map, TrackingVehicleCenter]);
  let markers = [];
  useEffect(() => {
    markers = [];
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
    markerData?.forEach(data => {
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
      {!HistoryTrackingActive && position !== null && (
        <>
          <Marker position={position}></Marker>
        </>
      )}
    </div>
  );
};

export default MarkerComp;
