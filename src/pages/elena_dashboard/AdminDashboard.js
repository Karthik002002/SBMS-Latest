import { React, lazy, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import LeafletMapExample from 'pages/tracking_page/LeafletMapExample';
import DateTime from './DateTime';
import CrmStats from 'components/dashboards/crm/CrmStats';
import SaasActiveUser from './SaasActiveUser';
import SaasRevenue from './SaasRevenue';
import SaasConversion from './SaasConversion';
import { activeUser } from './saas';
import WeatherDetails from './WeatherDetails';
import { usePingButton } from 'context/PingContext';
import DashboardData from '../../data/SBMSDashboardData.json';
import { DashboardURL } from '../../URL/url';
// import { buoys } from '../../data/dashboard/buoy';

const DoughnutRoundedChart = lazy(() => import('./DoughnutRoundedChart'));

const StackedHorizontalChart = lazy(() => import('./StackedHorizontalChart'));

const Customers = lazy(() => import('pages/dashboard/table/Customers'));

const AdminDashboard = () => {
  // const [center, setCenter] = useState([21.865413583095347, 71.49970380735064]);
  // const [zoomLevel, setZoomLevel] = useState(window.innerWidth < 530 ? 6 : 8);
  const [DashBoardData, setDashBoardData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [PieChartData, setPieChartData] = useState([]);
  const [StackHoriData, setStackHoriData] = useState([]);

  const { Ping } = usePingButton();
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));

  useEffect(() => {
    const newDataArray = DashBoardData.flatMap(company => {
      return company.data.map(dataObj => ({
        Company_name: dataObj.Company_name,
        company_id: dataObj.company_id,
        schools: dataObj.schools.flatMap(school => ({
          ...school,
          vehicles: school.vehicles.map(vehicle => ({ ...vehicle }))
        }))
      }));
    });

    const tableFormattedData = DashBoardData.flatMap(company => {
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
    // Define a function to calculate status counts for each school
    const calculateStatusCounts = vehicles => {
      const statusCounts = {
        total: vehicles.length,
        running: 0,
        idle: 0,
        stop: 0,
        out_of_network: 0,
        nodata: 0,
        towed: 0,
        parked: 0,
        rash_driving: 0 // New count for rash driving
      };

      vehicles.forEach(vehicle => {
        if (vehicle.speed_status) {
          statusCounts.rash_driving++;
          return;
        }

        switch (vehicle.status) {
          case 0:
            statusCounts.running++;
            break;
          case 1:
            statusCounts.idle++;
            break;
          case 2:
            statusCounts.stop++;
            break;
          case 3:
            statusCounts.towed++;
            break;
          case 4:
            statusCounts.nodata++;
            break;
          case 5:
            statusCounts.out_of_network++;
            break;
          case 6:
            statusCounts.parked++;
          default:
            break;
        }
      });

      return statusCounts;
    };

    // Create formatted data with status counts for each school
    const GraphFormattedData = DashBoardData.flatMap(company => {
      return company.data.flatMap(dataObj => {
        const { Company_name, company_id } = dataObj;
        return dataObj.schools.flatMap(school => {
          const { school_name, school_id, vehicles } = school;
          // Calculate status counts for vehicles in the school
          const statusCounts = calculateStatusCounts(vehicles);
          // Return formatted data including status counts
          return {
            Company_name,
            company_id,
            school_name,
            school_id,
            total_vehicles: statusCounts.total,
            status_counts: {
              running: statusCounts.running,
              idle: statusCounts.idle,
              stop: statusCounts.stop,
              out_of_Network: statusCounts.out_of_network,
              towed: statusCounts.towed,
              parked: statusCounts.parked,
              noData: statusCounts.nodata,
              RashCount: statusCounts.rash_driving
            }
          };
        });
      });
    });

    const calculateCompanyStatusCounts = schools => {
      let companyStatusCounts = {
        total: 0,
        running: 0,
        idle: 0,
        stop: 0,
        out_of_network: 0,
        nodata: 0,
        towed: 0,
        parked: 0,
        rash_driving: 0
      };

      // Iterate through each school
      schools.forEach(school => {
        companyStatusCounts.total += school.total_vehicles;
        companyStatusCounts.running += school.status_counts.running;
        companyStatusCounts.idle += school.status_counts.idle;
        companyStatusCounts.stop += school.status_counts.stop;
        companyStatusCounts.out_of_network +=
          school.status_counts.out_of_Network;
        companyStatusCounts.nodata += school.status_counts.noData;
        companyStatusCounts.towed += school.status_counts.towed;
        companyStatusCounts.parked += school.status_counts.parked;
        companyStatusCounts.rash_driving += school.status_counts.RashCount;
      });

      return companyStatusCounts;
    };

    const HorizontalFormattedData = DashBoardData.flatMap(company => {
      // Iterate through company data to collect school-wise data
      return company.data.map(dataObj => {
        const { Company_name, company_id } = dataObj;
        let companyData = {
          Company_name,
          company_id,
          schools: [] // Initialize an array to store school-wise data
        };

        // Iterate through schools in the dataObj
        dataObj.schools.forEach(school => {
          const { school_name, school_id, vehicles } = school;
          // Calculate status counts for vehicles in the school
          const statusCounts = calculateStatusCounts(vehicles);
          // Collect school-wise data
          const schoolData = {
            school_name,
            school_id,
            total_vehicles: statusCounts.total,
            status_counts: {
              running: statusCounts.running,
              idle: statusCounts.idle,
              stop: statusCounts.stop,
              out_of_Network: statusCounts.out_of_network,
              towed: statusCounts.towed,
              parked: statusCounts.parked,
              noData: statusCounts.nodata,
              RashCount: statusCounts.rash_driving
            }
          };
          // Push school-wise data to the array
          companyData.schools.push(schoolData);
        });

        // Calculate company-wise status counts
        const companyStatusCounts = calculateCompanyStatusCounts(
          companyData.schools
        );
        companyData.company_status_counts = companyStatusCounts;

        // Return the company-wise data
        return companyData;
      });
    });

    setStackHoriData(HorizontalFormattedData);
    setPieChartData(GraphFormattedData);
    setTableData(tableFormattedData);
    // setDachBoardData(newDataArray);
  }, [DashBoardData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(DashboardURL, {
          method: 'GET',
          headers: { Authorization: `token ${userToken.token}` }
        });
        if (response.status == 200) {
          const data = await response.json();
          setDashBoardData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //
  useEffect(() => {
    const fetchData = setInterval(async () => {
      try {
        const response = await fetch(DashboardURL, {
          method: 'GET',
          headers: { Authorization: `token ${userToken.token}` }
        });
        const data = await response.json();
        const orderedBuoysData = [...data].sort((a, b) =>
          b.zone.localeCompare(a.zone)
        );
        setBuoysData(orderedBuoysData);
        // setCenter([21.865413583095347, 71.49970380735064]);
        // setZoomLevel(window.innerWidth < 530 ? 6 : 8);
      } catch (error) {
        console.error(error);
      }
    }, 15 * 60000);

    return () => {
      clearInterval(fetchData);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(DashboardURL, {
          method: 'GET',
          headers: { Authorization: `token ${userToken.token}` }
        });
        if (response.status == 200) {
          const data = await response.json();
          setDashBoardData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [Ping]);

  const date = new Date();
  // alert(date.getHours());

  // const firstElement = [...zone][0];

  // console.log(firstElement);
  // zone.forEach(zoneData => {
  //   console.log(zoneData);
  // });

  return (
    <div className="mx-1">
      {/* <div className="my-2">
        <WeatherDetails data={buoysData} />
      </div> */}
      {/* <Row className="g-3 my-3">
        <Col md={4} xxl={12}>
          <SaasActiveUser data={activeUser} />
        </Col>
        <Col md={4} xxl={12}>
          <SaasRevenue />
        </Col>
        <Col md={4} xxl={12}>
          <SaasConversion />
        </Col>
      </Row> */}
      <Row className=" mt-2">
        <Col
          lg={6}
          md={12}
          sm={12}
          className="mb-2 ps-1 dashboard-graph-mobile"
        >
          <Row className="ms-2 ps-1">
            <DoughnutRoundedChart data={PieChartData} />
          </Row>
          <Row className="mt-2 ms-2 ps-1">
            <StackedHorizontalChart data={StackHoriData} />
          </Row>
        </Col>
        <Col lg={6} md={12} sm={12} className="">
          <Customers
            data={tableData}
            // setCenter={center => setCenter(center)}
            // setZoomLevel={zoomLevel => setZoomLevel(zoomLevel)}
          />
          {/* <Col lg={6} md={12} sm={12} className="mb-2"></Col> */}
        </Col>
      </Row>
      {/* <Row>
        <Col lg={12} md={12} sm={12}>
          <LeafletMapExample
            data={buoysData}
            center={center}
            zoomLevel={zoomLevel}
          />
        </Col>
      </Row> */}
    </div>
  );
};

export default AdminDashboard;
