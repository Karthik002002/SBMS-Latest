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

const ReportDriftedTable = () => {
  const [fromOpen, toggleFromOpen] = useDatePicker(false);
  const [toOpen, toggleToOpen] = useDatePicker(false);
  const [fromDate, setFromDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [DriftedQuery, setDriftedQuery] = useState(null);
  const [DriftedData, setDriftedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [resetDate, setResetDate] = useState(false);
  const [noData, setNoData] = useState(false);
  const [InvalidDate, setInvalidDate] = useState(false);
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));

  //handle Date changes
  const handleFromDateChange = date => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setFromDate(date);
      setDriftedQuery(null);
    } else {
      console.error('Invalid date object');
      setFromDate(null);
    }
  };

  const handleToDateChange = date => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setToDate(date);
      setDriftedQuery(null);
    } else {
      console.error('Invalid date object');
      setToDate(null);
    }
  };

  //handle reset
  const handleReset = () => {
    setNoData(false);
    setShowTable(false);
    setFromDate(null);
    setToDate(null);
    setResetDate(false);
    setInvalidDate(false);
  };

  //set the query from the selected Date
  useEffect(() => {
    if (fromDate && toDate && fromTime && toTime) {
      const fromDateFormatted = startOfDay(fromDate);
      const toDateFormatted = endOfDay(toDate);
      const formattedFromTime = format(
        new Date(`2000-01-01T${fromTime}`),
        'HH:mm:ss'
      );
      const formattedToTime = format(
        new Date(`2000-01-01T${toTime}`),
        'HH:mm:ss'
      );

      // Check if fromDate is before toDate
      if (isBefore(fromDateFormatted, toDateFormatted)) {
        setShowTable(false);
        setIsLoading(true);
        setNoData(false);
        setInvalidDate(false);
        const startOfDayDate = format(fromDateFormatted, 'yyyy-MM-dd');
        const endOfDayDate = format(toDateFormatted, 'yyyy-MM-dd');
        setDriftedQuery(
          `http://192.168.0.121:8000/record/km_report/?from=${startOfDayDate} ${formattedFromTime}&to=${endOfDayDate} ${formattedToTime}`
        );
      } else {
        setDriftedQuery(null);
        setInvalidDate(true);
        setShowTable(false);
        setNoData(false);
        setIsLoading(false);
        setResetDate(true);
        setDriftedData([]);
      }
    }
  }, [fromDate, fromTime, toTime, toDate]);

  //Retrieve selected date data from the API.
  useEffect(() => {
    if (
      fromDate &&
      toDate &&
      fromTime &&
      toTime &&
      DriftedQuery !== null &&
      !InvalidDate
    ) {
      const fetchData = async () => {
        if (DriftedQuery !== null) {
          try {
            const [selectedDate] = await Promise.all([
              fetch(DriftedQuery, {
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

            if (selectedDateResponse.length === 0) {
              setNoData(true);
              setDriftedData([]);
              setIsLoading(false);
              setResetDate(true);
              setShowTable(false);
              return;
            }
            setDriftedData(selectedDateResponse);
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
  }, [fromDate, toDate, DriftedQuery]);

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
            selected={fromDate}
            onChange={handleFromDateChange}
            dateFormat="dd/MM/yyyy"
            className="fs--1 report-input"
            maxDate={new Date()}
            onInputClick={toggleFromOpen}
            onSelect={toggleFromOpen}
            onClickOutside={toggleFromOpen}
            readOnly
          />
          <span className="ms-1" onClick={toggleFromOpen}>
            <FaCalendarDays />
          </span>
          <Form.Control
            type="time"
            name="FromTime"
            onChange={e => setFromTime(e.target.value)}
            className="form-control ms-2 testing-add-date-time report-input"
          />
        </div>
        <div className="mb-3 ms-4 d-flex">
          <label className="me-2 m-auto">To Date:</label>
          <DatePicker
            open={toOpen}
            selected={toDate}
            onChange={handleToDateChange}
            dateFormat="dd/MM/yyyy"
            className="fs--1 report-input"
            maxDate={new Date()}
            onSelect={toggleToOpen}
            onInputClick={toggleToOpen}
            onClickOutside={toggleToOpen}
            readOnly
          />
          <span className="ms-1" onClick={toggleToOpen}>
            <FaCalendarDays />
          </span>
          <Form.Control
            type="time"
            name="ToTime"
            onChange={e => setToTime(e.target.value)}
            className="form-control ms-2 testing-add-date-time report-input"
          />
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
        <div className="text-danger">Please enter a valid date.</div>
      )}
      {noData && (
        <div className="no-data-div">
          No Drifted Report is Found on the selected Date.
        </div>
      )}
      {isLoading && <div className="loading-spinner"></div>}
      {showTable && (
        <AdvanceTableWrapper
          columns={columns}
          data={DriftedData}
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
              {DriftedData.length > 20 ? <ReportTablePagination table /> : ''}
            </Card.Body>
          </Card>
        </AdvanceTableWrapper>
      )}
    </div>
  );
};

export default ReportDriftedTable;
