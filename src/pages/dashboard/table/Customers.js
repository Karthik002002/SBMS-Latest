import React, { useEffect, useRef, useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import CustomersTableHeader from './CustomersTableHeader';
import IconButton from 'components/common/IconButton';
import { useListFilterContext } from 'context/FilterContext';
import { format, parseISO } from 'date-fns';

const Customers = ({ data }) => {
  const { Filter, companyFilter } = useListFilterContext();
  const [InitialData, setInitialData] = useState(data);
  const [BackUpData, setBackupData] = useState(data);
  const CompanyData = [];
  const SchoolData = [];

  InitialData?.map(data => {
    if (!SchoolData.includes(data.school_name)) {
      SchoolData.push(data.school_name);
    }

    if (!CompanyData.includes(data.Company_name)) {
      CompanyData.push(data.Company_name);
    }
  });

  useEffect(() => {
    if (Filter && Filter.zone !== 'All') {
      const filteredData = BackUpData.filter(buoy => buoy.zone === Filter.zone);

      setInitialData(filteredData);
    } else if (Filter === null) {
      setInitialData(BackUpData);
    }
  }, [Filter]);

  useEffect(() => {
    setInitialData(data);
    setBackupData(data);
  }, [data]);
  useEffect(() => {
    if (companyFilter !== null) {
      const companyFilteredData = BackUpData.filter(
        data => data.Company_name === companyFilter
      );
      setInitialData(companyFilteredData);
    } else if (companyFilter === null) {
      setInitialData(BackUpData);
    }
  }, [companyFilter]);
  useEffect(() => {
    if (Filter !== null) {
      const SchoolFilteredData = BackUpData.filter(
        data => data.school_name === Filter
      );
      setInitialData(SchoolFilteredData);
    } else if (Filter === null) {
      setInitialData(BackUpData);
    }
  }, [Filter]);

  function ddToDMS(coordinate, type) {
    // Check if the coordinate is a valid number
    if (isNaN(coordinate)) {
      return 'Invalid coordinate';
    }

    // Determine the direction (N/S for latitude, E/W for longitude)
    let direction = '';
    if (type === 'latitude') {
      direction = coordinate >= 0 ? (coordinate === 0 ? '' : 'N') : 'S';
    } else if (type === 'longitude') {
      direction = coordinate >= 0 ? (coordinate === 0 ? '' : 'E') : 'W';
    }

    // Convert the absolute value of the coordinate to DMS
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutes = Math.floor((absolute - degrees) * 60);
    const seconds = ((absolute - degrees - minutes / 60) * 3600).toFixed(2);

    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  }

  // useEffect(() => {
  //   if (InitialData && InitialData.length > 0) {
  //     const updatedTableData = InitialData.map(buoy => ({
  //       buoyId: buoy.imei,
  //       buoyName: <>{buoy.buoy_name}</>,
  //       batteryVltInt: (
  //         <div
  //           className={`bg-${
  //             buoy.bt_volt > 12 ? 'success' : 'danger'
  //           } text-white rounded-5 text-center px-2`}
  //         >
  //           {buoy.bt_volt}
  //         </div>
  //       ),
  //       lightSensorData: (
  //         <div
  //           className={`bg-${
  //             buoy.light_status === 0
  //               ? 'danger'
  //               : buoy.light_status === 1
  //               ? 'success'
  //               : 'warning'
  //           } text-white rounded-5 text-center px-2`}
  //         >
  //           {`A : ${buoy.lux1}, S : ${buoy.lux2}`}
  //         </div>
  //       ),
  //       geoFence: 'Inside',
  //       location: (
  //         <div
  //           className={`bg-${
  //             buoy.geofence_status ? 'success' : 'danger'
  //           } text-white rounded-5 text-center px-2`}
  //         >
  //           {ddToDMS(buoy.lat, 'latitude')}, {ddToDMS(buoy.lon, 'longitude')}
  //         </div>
  //       ),
  //       createdAt: format(parseISO(buoy.timestamp), 'dd/MM/yyyy HH:mm:ss'),
  //       track: (
  //         <Link
  //           to="/monitoring"
  //           onClick={() => {
  //             // Passing the value to the context for using on monitoring page
  //             setActiveBuoy({ center: [buoy.lat, buoy.lon], zoomLevel: 17 });
  //             window.scroll({
  //               top: document.body.offsetHeight,
  //               left: 0,
  //               behavior: 'smooth'
  //             });
  //           }}
  //         >
  //           <IconButton
  //             variant="falcon-default"
  //             size="sm"
  //             icon="external-link-alt"
  //             transform="shrink-3"
  //           ></IconButton>
  //         </Link>
  //       )
  //     }));
  //     setRecentBuoysTableData(updatedTableData);
  //   }
  // }, [InitialData]);

  
  const columns = [
    // {
    //   accessor: 'status',
    //   Header: 'Status',
    //   headerProps: { className: 'text-center' },
    //   Cell: ({ value, row }) => {
    //     if (!value) return '-'; // Render a dash if the value is falsy
    //     let statusClassName = ''; // Initialize the class name variable
    //     let statusText = ''; // Initialize the text to be displayed in the cell

    //     // Logic to determine the class name and status text based on the value
    //     if (value) {
    //       if (row.original.speed_status) {
    //         statusCounts.rash_driving++;
    //         return;
    //       }
    //       switch (value) {
    //         case 0:
    //           statusClassName = 'status-running';
    //           statusText = 'Running';
    //           break;
    //         case 1:
    //           statusClassName = 'status-idle';
    //           statusText = 'Idle';
    //           break;
    //         case 2:
    //           statusClassName = 'status-stop';
    //           statusText = 'Stop';
    //           break;
    //         case 3:
    //           statusClassName = 'status-towed';
    //           statusText = 'Towed';
    //           break;
    //         case 4:
    //           statusClassName = 'status-nodata';
    //           statusText = 'No Data';
    //           break;
    //         case 5:
    //           statusClassName = 'status-out-of-network';
    //           statusText = 'Out of Network';
    //           break;
    //         case 6:
    //           statusClassName = 'status-parked';
    //           statusText = 'Parked';
    //           break;
    //         default:
    //           break;
    //       }
    //     }

    //     // Render the status with a small box and the status text
    //     return (
    //       <>
    //         <div></div>
    //         <div className={`status-box ${statusClassName}`}>
    //           <div className="status-indicator" />
    //           <span
    //             onClick={() => {
    //               console.log(row.original.speed_status);
    //             }}
    //           >
    //             {statusText}
    //           </span>
    //         </div>
    //       </>
    //     );
    //   }
    // },
    {
      accessor: 'vehicle_name',
      Header: 'Name',
      headerProps: { className: 'text-center' }
      // headerProps: { className: 'pe-7' }
    },
    {
      accessor: 'vehicle_reg',
      Header: 'Reg Num',
      headerProps: { className: 'text-center' },
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'speed',
      Header: 'Speed',
      headerProps: { className: 'text-center' },
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },

    {
      accessor: 'ignition',
      Header: 'Ignition',
      headerProps: { className: 'text-center' },
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => (value === true ? 'True' : 'False' || '-')
    },
    {
      accessor: 'driver',
      Header: 'Driver Name',
      headerProps: { className: 'text-center' },
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'phone',
      Header: 'Phone No',
      headerProps: { className: 'text-center' },
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'track',
      Header: 'Track',
      headerProps: { className: 'text-center' },
      Cell: ({ row }) => (
        <div onClick={() => console.log(row.original.imei)}>
          <IconButton
            variant="falcon-default"
            size="sm"
            icon="external-link-alt"
            transform="shrink-3"
          ></IconButton>
        </div>
      )
    }
  ];

  return (
    <div className={`h-100 ${window.innerWidth < 450 ? 'ms-3' : 'ms-2'}`}>
      <AdvanceTableWrapper
        columns={columns}
        data={InitialData}
        // selection
        // sortable
        // pagination
        // perPage={11}
        // rowCount={recentBuoysTableData.length}
      >
        <Card>
          <Card.Header>
            <CustomersTableHeader
              table
              Schooldata={SchoolData}
              CompanyData={CompanyData}
            />
          </Card.Header>
          <Card.Body className="p-0  ">
            <AdvanceTable
              table
              headerClassName="bg-200 text-900 text-nowrap align-middle"
              rowClassName="btn-reveal-trigger text-nowrap align-middle"
              tableProps={{
                size: 'sm',
                className: 'fs--1 mb-0 overflow-hidden'
              }}
            />
          </Card.Body>
          {/* <Card.Footer>
            <AdvanceTableFooter
            // rowCount={recentBuoysTableData.length}
            // table
            // rowInfo
            // navButtons
            />
          </Card.Footer> */}
        </Card>
      </AdvanceTableWrapper>
    </div>
  );
};

export default Customers;
