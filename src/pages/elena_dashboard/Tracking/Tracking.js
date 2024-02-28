import MainLayout from 'layouts/CustomMainLayout';
// import LeafletMapExample from 'pages/tracking_page/LeafletMapExample';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { usePingButton } from 'context/PingContext';
import { useListFilterContext } from 'context/FilterContext';
// import VerticalBar from './VerticalBar';
import DemoData from 'data/SBMSDashboardData.json';
import { DashboardURL } from '../../../URL/url';
import MapComp from 'pages/tracking_page/TrackingMap/MapComp';
const Tracking = () => {
  const {
    ActiveVehicle,
    setActiveVehicle,
    HistoryTrackingActive,
    setMarkerData
  } = useListFilterContext();
  const [InitialData, setInitialData] = useState([]);
  const [VehicleData, setVehicleData] = useState([]);
  const memoizedVehicleData = useMemo(() => VehicleData, [VehicleData]);
  const [MinCall, setMinCall] = useState(0);
  const { Ping } = usePingButton();
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (InitialData.length !== 0) {
      const tableFormattedData = InitialData.data.flatMap(company => {
        const { user_id, user_name, user_type } = InitialData;
        const { company_name } = company;
        return company.schools.flatMap(school => {
          const { school_name } = school;
          return school.vehicles.flatMap(vehicle => {
            const { last_records, ...vehicleData } = vehicle;
            const lastRecord = last_records[0];
            const { kilometers, ...lastRecWithoutKilometers } =
              lastRecord || {};

            return {
              ...vehicleData,
              company_name,
              school_name,
              user_id,
              user_name,
              user_type,
              ...lastRecWithoutKilometers
            };
          });
        });
      });
      setMarkerData(tableFormattedData);
      setVehicleData(tableFormattedData);
    }
  }, [InitialData]);

  useEffect(() => {
    if (!HistoryTrackingActive) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${DashboardURL}?user=${userToken.user_id}`,
            {
              method: 'GET',
              headers: { Authorization: `token ${userToken.token}` }
            }
          );
          if (response.status == 200) {
            const data = await response.json();
            // const orderedBuoysData = [...data].sort((a, b) =>
            //   b.zone.localeCompare(a.zone)
            // );
            setInitialData(data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
    if (ActiveVehicle !== null) {
      const [lat, lon] = ActiveBuoy.center;
      // setCenter([lat, lon]);
      // setZoomLevel(ActiveBuoy.zoomLevel);
    }
    setActiveVehicle(null);

    //Each minutes it calls the data
    const IntervalCall = setInterval(() => {
      setMinCall(MinCall + 1);
    }, 60000);

    return () => clearInterval(IntervalCall);
  }, [MinCall, Ping]);

  useEffect(() => {}, []);

  return (
    <>
      {/* <MainLayout /> */}
      <div className="mt-2">
        <Row>
          <Col sm={2} md={2} className="">
            <Sidebar
              data={memoizedVehicleData}
              // setCenter={latLng => setCenter(latLng)}
              // setZoomLevel={zoom => setZoomLevel(zoom)}
            />
            {/* <div className="mt-5">
              <NavbarVertical
                data={buoysData}
                setCenter={center => setCenter(center)}
                setZoomLevel={zoomLevel => setZoomLevel(zoomLevel)}
              />
            </div> */}
            {/* <VerticalBar /> */}
          </Col>
          <Col sm={10} md={10} className=" ps-1">
            {/* <LeafletMapExample
              data={memoizedVehicleData}
              // center={center}
              // zoomLevel={zoomLevel}
            /> */}
            <MapComp />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Tracking;
