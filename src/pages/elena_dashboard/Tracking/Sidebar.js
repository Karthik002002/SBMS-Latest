import React, { useEffect, useRef, useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Form } from 'react-bootstrap';
import IconButton from 'components/common/IconButton';
import SidebarTableHeader from './SidebarTableHeader';
import MonitoringTable from './MonitoringTable';
import { format, parseISO } from 'date-fns';
import { useListFilterContext } from 'context/FilterContext';

const Sidebar = ({ data }) => {
  const [ActiveCompany, setCompany] = useState(null);
  const {
    setTrackingVehicleCenter,
    setZoomLevel,
    setIMEI,
    setHistoryTrackingActive
  } = useListFilterContext();
  const VehicleData = [];
  const companyData = [];
  const schoolData = [];
  const vehicleName = [];
  data.forEach(data => {
    if (!companyData.includes(data.Company_name)) {
      companyData.push(data.Company_name);
    }
    if (!schoolData.includes(data.school_name)) {
      schoolData.push(data.school_name);
    }
    if (!vehicleName.includes(data.vehicle_name)) {
      vehicleName.push(data.vehicle_name);
    }

    VehicleData.push({
      companyName: data.Company_name,
      CompanyID: data.company_id,
      SchoolID: data.school_id,
      schoolName: data.school_name,
      vehicleName: data.vehicle_name,
      VehicleReg: data.vehicle_reg,
      imei: data.imei,
      driver: data.driver,
      driverPhone: data.phone,
      status: data.status,
      speedStatus: data.speed_status,
      lat: data.lat,
      lon: data.lon,
      latDir: data.lat_dir,
      lonDir: data.lon_dir
    });
  });
  // console.log(VehicleData);
  // let zoneArray = ['All', ...zone];
  // const [zoneData, setZoneData] = useState();
  // console.log(zoneArray);

  //   console.log(zoneArray);
  // console.log(recentBuoysTableData);

  const columns = [
    {
      accessor: 'vehicle_name',
      Header: 'Buoy List'
      // headerProps: { className: 'pe-7' }
    },
    // {
    //   accessor: 'status'
    // },
    {
      accessor: 'track',
      Cell: ({ row }) => (
        <div
          onClick={() => {
            setTrackingVehicleCenter([row.original.lat, row.original.lon]);
            setZoomLevel(17);
            setIMEI(row.original.imei);
            setHistoryTrackingActive(false);
          }}
          className="tracking-table-button"
        >
          <IconButton
            variant="falcon-default"
            size="sm"
            icon="external-link-alt"
            transform="shrink-3"
          ></IconButton>
        </div>
      )
    }

    // {
    //   accessor: 'status'
    //   // Header: 'Track'
    // }
  ];

  return (
    <div className="h-100 ms-2 mobile-monitoring-table">
      <AdvanceTableWrapper
        columns={columns}
        data={data}
        // selection
        // sortable
        // pagination
        // perPage={11}
        // rowCount={recentBuoysTableData.length}
      >
        <Card className="monitoring-table">
          <Card.Header>
            <div className="d-flex justify-content-between vehicle-table-header">
              <SidebarTableHeader table />
              <div className="my-2">
                <Form.Select
                  size="sm"
                  //   value={zoneData}
                  onChange={e => {
                    setCompany(e.target.value);
                  }}
                  style={{ maxWidth: '320px' }}
                  className=""
                >
                  <option value="null" key="null">
                    Select
                  </option>
                  {companyData.map((data, index) => (
                    <option value={data} key={index}>
                      {data}
                    </option>
                  ))}

                  {/* {<option value={zone}>{[...zone[0]]}</option>} */}
                </Form.Select>
              </div>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            {/* <StatusTabs /> */}
            <MonitoringTable
              table
              headerClassName="bg-200 text-900 text-nowrap align-middle d-none"
              rowClassName="btn-reveal-trigger text-nowrap align-middle"
              tableProps={{
                size: 'sm',
                className: 'fs--1 mb-0 overflow-auto'
              }}
              ActiveCompany={ActiveCompany}
              vehicleData={VehicleData}
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

export default Sidebar;
