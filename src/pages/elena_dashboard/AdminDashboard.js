import { React, lazy, memo, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { usePingButton } from 'context/PingContext';
import { DashboardURL } from '../../URL/url';
import { useListFilterContext } from 'context/FilterContext';
// import { buoys } from '../../data/dashboard/buoy';

const DoughnutRoundedChart = lazy(() => import('./DoughnutRoundedChart'));

const StackedHorizontalChart = lazy(() => import('./StackedHorizontalChart'));

const Customers = lazy(() => import('pages/dashboard/table/Customers'));

const AdminDashboard = () => {
  const [ChartData, setChartData] = useState({
    tableDataDashBoard: [],
    PieChartData: [],
    HorizontalFormattedData: []
  });
  const MemoChartData = useMemo(() => ChartData, [ChartData]);
  const { Ping } = usePingButton();
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  const { setHistoryTrackingActive, IMEI } = useListFilterContext();

  const dataFormatting = data => {
    setHistoryTrackingActive(false);

    const tableFormattedData = data.flatMap(company => {
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
    const GraphFormattedData = data.flatMap(company => {
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

    const HorizontalFormattedData = data.flatMap(company => {
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
    setChartData({
      HorizontalFormattedData: HorizontalFormattedData,
      tableDataDashBoard: tableFormattedData,
      PieChartData: GraphFormattedData
    });
  };

  // return () => clearInterval(socketKeepAliveCall);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(DashboardURL, {
          method: 'GET',
          headers: { Authorization: `token ${userToken.token}` }
        });
        const data = await response.json();
        dataFormatting(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (IMEI !== null) {
      socket.send(`stop:${IMEI}`);
    }
    // if (socket) {
    //   socket.onmessage = event => {
    //     console.log('Message received from server:', event.data);
    //   };
    // }
    const interval = setInterval(fetchData, 60 * 1000);

    // Clean up the event listener when component unmounts

    var myWorker = new Worker('sw.js');
    var ParsedData;
    var data,
      changeData = function () {
        data = sessionStorage.getItem('loggedInUser');
        ParsedData = JSON.parse(data);
        sendToWorker();
      },
      sendToWorker = function () {
        // Send data to your worker
        myWorker.postMessage({
          User: ParsedData
        });
      };
    changeData();
    fetchData();
    return () => {
      clearInterval(interval);
    };
  }, [Ping]);

  return (
    <div className="mx-1">
      <Row className=" mt-2">
        <Col
          lg={6}
          md={12}
          sm={12}
          className="mb-2 ps-1 dashboard-graph-mobile"
        >
          <Row className="ms-2 ps-1">
            <DoughnutRoundedChart data={MemoChartData.PieChartData} />
          </Row>
          <Row className="mt-2 ms-2 ps-1">
            <StackedHorizontalChart
              data={MemoChartData.HorizontalFormattedData}
            />
          </Row>
        </Col>
        <Col lg={6} md={12} sm={12} className="">
          <Customers data={MemoChartData.tableDataDashBoard} />
        </Col>
      </Row>
    </div>
  );
};

export default memo(AdminDashboard);
