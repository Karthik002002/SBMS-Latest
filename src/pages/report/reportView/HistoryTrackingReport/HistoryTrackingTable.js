import React, { useState, useEffect } from 'react';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Button, Card, Form } from 'react-bootstrap';
import ReportAdvanceTable from 'pages/report/report-advancetable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfDay, endOfDay, format, isBefore } from 'date-fns';
import ReportTablePagination from 'pages/report/report-tablepagination';
import { FaCalendarDays } from 'react-icons/fa6';
import useDatePicker from 'pages/report/DatePickerHandler';
import { KMReportURL, VehicleDataURL } from '../../../../URL/url';
import { useNavigate } from 'react-router-dom';

const ReportHistoryTrackingTable = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [fromOpen, toggleFromOpen] = useDatePicker(false);
  const [toOpen, toggleToOpen] = useDatePicker(false);
  const [DateTime, setDateTime] = useState({});
  const [FieldDateTime, setFieldDateTime] = useState({});
  const [KMReportData, setKMReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [resetDate, setResetDate] = useState(false);
  const [noData, setNoData] = useState(false);
  const [AllInput, setAllInput] = useState(false);
  const [InvalidDate, setInvalidDate] = useState(false);
  const Navigate = useNavigate();
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  const pageOptions = [
    { Name: 'KM Tracking Report', link: 'KM-report' },
    { Name: 'Idle Report', link: 'idle' },
    { Name: 'Running Report', link: 'running' },
    { Name: 'Stopped Report', link: 'stopped' },
    { Name: 'History Tracking Report', link: 'history-tracking' }
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(VehicleDataURL, {
          method: 'GET',
          headers: { Authorization: `token ${userToken.token}` }
        });
        if (response.status == 200) {
          const data = await response.json();
          setVehicleData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //handle reset
  const handleReset = () => {
    setNoData(false);
    setShowTable(false);
    setDateTime({});
    setFieldDateTime({});
    setResetDate(false);
    setInvalidDate(false);
    setAllInput(false);
  };
  const handleDateChange = (date, fieldName) => {
    setNoData(false);
    setFieldDateTime({ ...FieldDateTime, [fieldName]: date });
    const formattedDateTime = format(date, 'yyyy-MM-dd HH:mm:ss');
    setDateTime({ ...DateTime, [fieldName]: formattedDateTime });
  };
  const isBeforeDateTime = (fromDate, toDate) => {
    return fromDate.getTime() < toDate.getTime();
  };

  //set the query from the selected Date
  const handleSearch = async () => {
    let query = null;
    if (DateTime.FromDateTime && DateTime.ToDateTime && DateTime.vehicleNo) {
      const fromDateTime = new Date(DateTime.FromDateTime);
      const toDateTime = new Date(DateTime.ToDateTime);
      // Check if fromDate is before toDate
      if (
        isBeforeDateTime(fromDateTime, toDateTime) &&
        DateTime.vehicleNo !== null
      ) {
        setShowTable(false);
        setIsLoading(true);
        setNoData(false);
        setInvalidDate(false);
        query = `${KMReportURL}?from_date=${
          DateTime.FromDateTime.split(' ')[0]
        }&to_date=${DateTime.ToDateTime.split(' ')[0]}&from_time=${
          DateTime.FromDateTime.split(' ')[1]
        }&to_time=${DateTime.ToDateTime.split(' ')[1]}&vehicle_id=${
          DateTime.vehicleNo
        }`;

        GettingData(query);
        setAllInput(false);
      } else {
        query = null;

        setInvalidDate(true);
        setShowTable(false);
        setNoData(false);
        setIsLoading(false);
        setResetDate(true);
        setKMReportData([]);
      }
    } else {
      setAllInput(true);
    }
  };

  //Retrieve selected date data from the API.
  const GettingData = async link => {
    console.log(link);
    console.log('GettingData');
    if (link !== null) {
      console.log(true);
      try {
        const selectedDate = await fetch(link, {
          method: 'GET',
          headers: { Authorization: `token ${userToken.token}` }
        });

        if (!selectedDate.ok) {
          throw new Error(`Error on getting the Monthly API`);
        }

        const selectedDateResponse = await selectedDate.json();

        if (selectedDateResponse.length === 0) {
          setNoData(true);
          setKMReportData([]);
          setIsLoading(false);
          setResetDate(true);
          setShowTable(false);
          return;
        }

        setKMReportData(selectedDateResponse);
        setNoData(false);
        setShowTable(true);
        setResetDate(true);
        setIsLoading(false);
      } catch (error) {
        console.error(`HTTP Error :`, error);
      }
    }
  };
  const handlePageSelection = e => {
    const { value } = e.target;
    Navigate(`/report/${value}`);
  };
  const handleVehicleNameChange = e => {
    if (e.target.value !== 'Select') {
      const VehicleID = vehicleData.find(
        data => data.vehicle_name === e.target.value
      );
      setDateTime({ ...DateTime, vehicleNo: VehicleID.id });
    } else {
      setDateTime({ ...DateTime, vehicleNo: null });
    }
  };
  const columns = [
    {
      accessor: 'vehicle_name',
      Header: 'Vehicle Name',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'vehicle_no',
      Header: 'Vehicle No',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'company_name',
      Header: 'Company Name',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'school_name',
      Header: 'School Name',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'date',
      Header: 'Date',
      headerProps: { className: 'business-card-company' },
      cellProps: {
        className: 'business-card-company-cell text-break text-center'
      },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'time',
      Header: 'Time',
      headerProps: { className: 'business-card-company' },
      cellProps: {
        className: 'business-card-company-cell text-break text-center'
      },
      Cell: ({ value }) => {
        if (!value) return '-'; // Render a dash if the value is falsy

        // Split the time string into hours, minutes, and seconds
        const [hours, minutes, seconds] = value.split(':');

        // Create a new Date object with the parsed values
        const time = new Date();
        time.setHours(parseInt(hours, 10));
        time.setMinutes(parseInt(minutes, 10));
        time.setSeconds(parseInt(seconds, 10));

        // Format the time in HH:mm:ss format
        const formattedTime = time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        return formattedTime;
      }
    },
    {
      accessor: 'last_coords',
      Header: 'Coords',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => {
        if (!value || !Array.isArray(value) || value.length !== 2) {
          return '-';
        }

        const [latitude, longitude] = value;
        return `Lat : ${latitude.toFixed(7)}, Lon : ${longitude.toFixed(7)}`;
      }
    },
    {
      accessor: 'total_distance',
      Header: 'Total Distance',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => {
        if (value === 0) {
          return '0 m';
        } else if (value < 1) {
          return `${(value * 1000).toFixed(1)} m`;
        } else {
          return `${value.toFixed(2)} km`;
        }
      }
    }
  ];

  return (
    <>
      {window.innerWidth < 530 && (
        <>
          <div className="report-header">
            History Tracking Report
            <div>
            <label className="report-mobile-select-label">Page:</label>
              <select
                onChange={e => handlePageSelection(e)}
                className="report-mobile-select"
              >
                <option value="'" key="1">
                  Select
                </option>
                {pageOptions.map(page => (
                  <option value={page.link} key={page.link}>
                    {page.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
      <div className={`${window.innerWidth < 530 ? 'mt-0 ms-1' : 'mt-2'}`}>
        <div className=" report-table-view mobile-view-report-table ">
          <div className="mb-3 d-flex">
            <label className="me-2 m-auto">From Date:</label>
            <DatePicker
              open={fromOpen}
              selected={FieldDateTime?.FromDateTime}
              onChange={date => handleDateChange(date, 'FromDateTime')}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mmaa"
              className="fs--1 report-input"
              maxDate={new Date()}
              onInputClick={toggleFromOpen}
              onClickOutside={toggleFromOpen}
              readOnly
              timeIntervals={15}
            />
            <span className="ms-1" onClick={toggleFromOpen}>
              <FaCalendarDays />
            </span>
          </div>
          <div
            className={`${
              window.innerWidth < 530 ? 'mb-3 ms-2 d-flex' : 'mb-3 ms-3 d-flex'
            }`}
          >
            <label className=" me-2 m-auto">To Date:</label>
            <DatePicker
              open={toOpen}
              selected={FieldDateTime?.ToDateTime}
              onChange={date => handleDateChange(date, 'ToDateTime')}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mmaa"
              className={`fs--1 report-input ms-3`}
              maxDate={new Date()}
              onInputClick={toggleToOpen}
              onClickOutside={toggleToOpen}
              readOnly
              timeIntervals={15}
            />
            <span className="ms-1" onClick={toggleToOpen}>
              <FaCalendarDays />
            </span>
          </div>
          <div className="mb-2 ms-2 d-flex">
            <label className="km-report-label">Select Vehicle</label>
            <Form.Select
              className="km-report-select-vehicle"
              onChange={e => {
                handleVehicleNameChange(e);
              }}
            >
              <option value={null}>Select</option>
              {vehicleData.map(data => (
                <option value={data.vehicle_name}>{data.vehicle_name}</option>
              ))}
            </Form.Select>
          </div>
          <div className="mb-3 report-search-clear-btn-container">
            <Button
              variant=""
              className="fs--1 report-search-button"
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </Button>
            {resetDate && (
              <Button
                variant="danger"
                onClick={handleReset}
                className="ms-2 fs--1 p-1 ps-2 pe-2 km-report-clr-btn "
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        {InvalidDate && (
          <div className="text-danger">Please enter a valid Date and Time.</div>
        )}
        {AllInput && (
          <div className="text-danger fs--1 report-required-warning-text">
            Fill out all required information.
          </div>
        )}
        {noData && (
          <div className="no-data-div">
            No KM Tracking Report is Found on the selected Date.
          </div>
        )}
        {isLoading && <div className="loading-spinner"></div>}
        {showTable && (
          <AdvanceTableWrapper
            columns={columns}
            data={KMReportData}
            selection
            sortable
            pagination
            perPage={20}
          >
            <Card>
              <Card.Body>
                <ReportAdvanceTable
                  table
                  headerClassName="bg-200 text-900 text-wrap align-middle text-center"
                  rowClassName="align-middle white-space-nowrap p-2 text-right fs--1"
                  tableProps={{
                    size: 'sm',
                    striped: true,
                    className: 'fs--1 mb-0 overflow-hidden'
                  }}
                />
                {KMReportData.length > 20 ? (
                  <ReportTablePagination table />
                ) : (
                  ''
                )}
              </Card.Body>
            </Card>
          </AdvanceTableWrapper>
        )}
      </div>
    </>
  );
};

export default ReportHistoryTrackingTable;
