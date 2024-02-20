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
import { KMReportURL } from '../../../../URL/url';

const ReportDriftedTable = () => {
  const [fromOpen, toggleFromOpen] = useDatePicker(false);
  const [toOpen, toggleToOpen] = useDatePicker(false);
  const [DateTime, setDateTime] = useState({});
  const [FieldDateTime, setFieldDateTime] = useState({});
  const [KMTrackingQuery, setKMTrackingQuery] = useState(null);
  const [KMReportData, setKMReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [resetDate, setResetDate] = useState(false);
  const [noData, setNoData] = useState(false);
  const [InvalidDate, setInvalidDate] = useState(false);
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));

  //handle reset
  const handleReset = () => {
    setNoData(false);
    setShowTable(false);
    setDateTime({});
    setFieldDateTime({});
    setResetDate(false);
    setInvalidDate(false);
  };
  const handleDateChange = (date, fieldName) => {
    setNoData(false);
    setFieldDateTime({ ...FieldDateTime, [fieldName]: date });
    const formattedDateTime = format(date, 'yyyy/MM/dd HH:mm:ss');
    setDateTime({ ...DateTime, [fieldName]: formattedDateTime });
  };
  const isBeforeDateTime = (fromDate, toDate) => {
    return fromDate.getTime() < toDate.getTime();
  };

  //set the query from the selected Date
  useEffect(() => {
    if (DateTime.FromDateTime && DateTime.ToDateTime) {
      const fromDateTime = new Date(DateTime.FromDateTime);
      const toDateTime = new Date(DateTime.ToDateTime);
      // Check if fromDate is before toDate
      if (isBeforeDateTime(fromDateTime, toDateTime)) {
        console.log('Date Updated');
        setShowTable(false);
        setIsLoading(true);
        setNoData(false);
        setInvalidDate(false);
        setKMTrackingQuery(
          `${KMReportURL}?from=${DateTime.FromDateTime}&to=${DateTime.ToDateTime}`
        );
      } else {
        setKMTrackingQuery(null);
        setInvalidDate(true);
        setShowTable(false);
        setNoData(false);
        setIsLoading(false);
        setResetDate(true);
        setKMReportData([]);
      }
    }
  }, [DateTime]);

  //Retrieve selected date data from the API.
  useEffect(() => {
    if (
      DateTime.FromDateTime &&
      DateTime.ToDateTime &&
      KMTrackingQuery !== null &&
      !InvalidDate
    ) {
      const fetchData = async () => {
        if (KMTrackingQuery !== null) {
          try {
            const [selectedDate] = await Promise.all([
              fetch(KMTrackingQuery, {
                method: 'GET',
                headers: { Authorization: `token ${userToken.token}` }
              })
            ]);
            if (!selectedDate.ok) {
              throw new Error(`Error on getting the Monthly API`);
              return;
            }

            const [selectedDateResponse] = await Promise.all([
              selectedDate.json()
            ]);
            setNoData(false);
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
      fetchData();
    }
  }, [KMTrackingQuery]);

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
      accessor: 'timestamp',
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
        const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return formattedTime;
      }
    },
    {
      accessor: 'lat',
      Header: 'Location',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ row }) => {
        const { latitude, longitude } = row.original;
        return latitude && longitude
          ? `Lat : ${latitude.toFixed(7)}, Lon : ${longitude.toFixed(7)}`
          : '-';
      }
    },
    {
      accessor: 'total_distance',
      Header: 'Total KM',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value.toFixed(0) || '-'
    }
  ];

  return (
    <div className={`${window.innerWidth < 530 ? 'mt-0 ms-1' : 'mt-4'}`}>
      <div className="d-flex flex-row pt-3 flex-wrap">
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
            // onSelect={toggleFromOpen}
            onClickOutside={toggleFromOpen}
            readOnly
          />
          <span className="ms-1" onClick={toggleFromOpen}>
            <FaCalendarDays />
          </span>
        </div>
        <div className="mb-3 ms-4 d-flex">
          <label className="me-2 m-auto">To Date:</label>
          <DatePicker
            open={toOpen}
            selected={FieldDateTime?.ToDateTime}
            onChange={date => handleDateChange(date, 'ToDateTime')}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mmaa"
            className="fs--1 report-input"
            maxDate={new Date()}
            // onSelect={toggleToOpen}
            onInputClick={toggleToOpen}
            onClickOutside={toggleToOpen}
            readOnly
          />
          <span className="ms-1" onClick={toggleToOpen}>
            <FaCalendarDays />
          </span>
        </div>

        <div>
          {resetDate && (
            <Button
              variant="danger"
              onClick={handleReset}
              className="ms-2 fs--1 p-1 ps-2 pe-2"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {InvalidDate && (
        <div className="text-danger">Please enter a valid Date and Time.</div>
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
              {KMReportData.length > 20 ? <ReportTablePagination table /> : ''}
            </Card.Body>
          </Card>
        </AdvanceTableWrapper>
      )}
    </div>
  );
};

export default ReportDriftedTable;
