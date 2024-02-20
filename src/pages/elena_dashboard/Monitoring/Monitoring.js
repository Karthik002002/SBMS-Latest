import MainLayout from 'layouts/CustomMainLayout';
import LeafletMapExample from 'pages/tracking_page/LeafletMapExample';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { usePingButton } from 'context/PingContext';
import { useListFilterContext } from 'context/FilterContext';
// import VerticalBar from './VerticalBar';
import DemoData from 'data/SBMSDashboardData.json';
import { DashboardURL } from '../../../URL/url';
const Monitoring = () => {
  const { ActiveVehicle, setActiveVehicle } = useListFilterContext();
  const [center, setCenter] = useState([13.422925089909123, 77.9857877043398]);
  const [zoomLevel, setZoomLevel] = useState(window.innerWidth < 530 ? 6 : 8);
  const [InitialData, setInitialData] = useState([]);
  const [VehicleData, setVehicleData] = useState([]);
  const [MinCall, setMinCall] = useState(0);
  const { Ping } = usePingButton();
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (InitialData) {
      const tableFormattedData = InitialData.flatMap(company => {
        return company.data.flatMap(dataObj => {
          const { Company_name, company_id } = dataObj;
          return dataObj.schools.flatMap(school => {
            const { school_name, school_id } = school;
            return school.vehicles.map(vehicle => ({
              ...vehicle,
              Company_name,
              company_id,
              school_name,
              school_id
            }));
          });
        });
      });
      setVehicleData(tableFormattedData);
    }
  }, [InitialData]);
  useEffect(() => {
    console.log(center);
  }, [center]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(DashboardURL, {
          method: 'GET',
          headers: { Authorization: `token ${userToken.token}` }
        });
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

    if (ActiveVehicle !== null) {
      const [lat, lon] = ActiveBuoy.center;
      setCenter([lat, lon]);
      setZoomLevel(ActiveBuoy.zoomLevel);
    }
    setActiveVehicle(null);
    //Each minutes it calls the data
    const IntervalCall = setInterval(() => {
      setMinCall(MinCall + 1);
    }, 60000);
    return () => clearInterval(IntervalCall);
  }, [MinCall, Ping]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(mainURL, {
  //         method: 'GET',
  //         headers: { Authorization: `token ${userToken.token}` }
  //       });
  //       const data = await response.json();
  //       const orderedBuoysData = [...data].sort((a, b) =>
  //         b.zone.localeCompare(a.zone)
  //       );
  //       setBuoysData(orderedBuoysData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [Ping]);

  return (
    <>
      {/* <MainLayout /> */}
      <div className="mt-2">
        <Row>
          <Col sm={2} md={2} className="">
            <Sidebar
              data={VehicleData}
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
            <LeafletMapExample
              data={VehicleData}
              // center={center}
              // zoomLevel={zoomLevel}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Monitoring;
