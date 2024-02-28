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
  const {
    Filter,
    companyFilter,
    setTrackingVehicleCenter,
    setZoomLevel,
    setIMEI
  } = useListFilterContext();
  const [InitialData, setInitialData] = useState(data);
  const [BackUpData, setBackupData] = useState(data);
  const CompanyData = [];
  const SchoolData = [];

  InitialData?.map(data => {
    if (!SchoolData.includes(data.school_name)) {
      SchoolData.push(data.school_name);
    }

    if (!CompanyData.includes(data.company_name)) {
      CompanyData.push(data.company_name);
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
        data => data.company_name === companyFilter
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
      // setInitialData(SchoolFilteredData);
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
    return statusText;
  }

  const columns = [
    {
      accessor: 'vehicle_name',
      Header: 'Name',
      headerProps: { className: 'text-center' }
      // headerProps: { className: 'pe-7' }
    },
    {
      accessor: 'vehicle_regno',
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
      Cell: ({ value }) => (value !== undefined ? value : '-')
    },
    {
      accessor: 'ignition',
      Header: 'Ignition',
      headerProps: { className: 'text-center' },
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => (value === true ? 'True' : 'False' || '-')
    },
    {
      accessor: 'driver_name',
      Header: 'Driver Name',
      headerProps: { className: 'text-center' },
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'driver_phone',
      Header: 'Phone No',
      headerProps: { className: 'text-center' },
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'status',
      Header: 'Status',
      headerProps: { className: 'text-center' },
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value, row }) =>
        getStatusAndIcon(value, row.original.speed_status) || '-'
    },
    {
      accessor: 'track',
      Header: 'Track',
      headerProps: { className: 'text-center' },
      Cell: ({ row }) => (
        <Link to="/tracking">
          <div
            onClick={() => {
              setIMEI(row.original.imei);
              setTrackingVehicleCenter([row.original.lat, row.original.lon]);
              setZoomLevel(17);
            }}
          >
            <IconButton
              variant="falcon-default"
              size="sm"
              icon="external-link-alt"
              transform="shrink-3"
            ></IconButton>
          </div>
        </Link>
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
