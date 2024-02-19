import React, { useState, useEffect } from 'react';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Button, Card } from 'react-bootstrap';
import ReportAdvanceTable from 'pages/report/report-advancetable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfDay, endOfDay, format, isBefore } from 'date-fns';
import ReportTablePagination from 'pages/report/report-tablepagination';
import { FaCalendarDays } from 'react-icons/fa6';
import { useListFilterContext } from 'context/FilterContext';
import useDatePicker from 'pages/report/DatePickerHandler';

const ReportLowBateryTable = () => {
  const [FromOpen, toggleFromOpen] = useDatePicker();
  const [ToOpen, toggleToOpen] = useDatePicker();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [LowBatteryQuery, setLowBattertQuery] = useState(null);
  const [LowBatteryData, setLowBatteryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [resetDate, setResetDate] = useState(false);
  const [noData, setNoData] = useState(false);
  const [InvalidDate, setInvalidDate] = useState(false);
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  const { PageCount } = useListFilterContext();
  //handle Date change
  const handleFromDateChange = date => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setFromDate(date);
      setLowBattertQuery(null);
    } else {
      console.error('Invalid date object');
      setFromDate(null);
    }
  };

  const handleToDateChange = date => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setToDate(date);
      setLowBattertQuery(null);
    } else {
      console.error('Invalid date object');
      setToDate(null);
    }
  };

  //handle Reset
  const handleReset = () => {
    setNoData(false);
    setShowTable(false);
    setFromDate(null);
    setToDate(null);
    setResetDate(false);
    setInvalidDate(false);
  };

  //set the Query
  useEffect(() => {
    if (fromDate && toDate) {
      const fromDateFormatted = startOfDay(fromDate);
      const toDateFormatted = endOfDay(toDate);
      if (isBefore(fromDateFormatted, toDateFormatted)) {
        setShowTable(false);
        setIsLoading(true);
        setNoData(false);
        setInvalidDate(false);
        const startOfDayDate = format(fromDateFormatted, 'yyyy-MM-dd');
        const endOfDayDate = format(toDateFormatted, 'yyyy-MM-dd');
        setLowBattertQuery(
          `https://bmsadmin.elenageosys.com/battery-report/get_report/?from=${startOfDayDate}&to=${endOfDayDate}`
        );
      } else {
        setLowBattertQuery(null);
        setInvalidDate(true);
        setShowTable(false);
        setNoData(false);
        setIsLoading(false);
        setResetDate(true);
        setLowBatteryData([]);
      }
    }
  }, [fromDate, toDate]);

  //Retrieve selected date data from the API.
  useEffect(() => {
    if (fromDate && toDate && LowBatteryQuery !== null && !InvalidDate) {
      const fetchData = async () => {
        if (LowBatteryQuery !== null) {
          try {
            const [selectedDate] = await Promise.all([
              fetch(LowBatteryQuery, {
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
              setLowBatteryData([]);
              setIsLoading(false);
              setResetDate(true);
              setShowTable(false);
              return;
            }
            setLowBatteryData(selectedDateResponse);
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
  }, [fromDate, toDate, LowBatteryQuery]);

  const columns = [
    {
      accessor: 'buoy_name',
      Header: 'Buoy Name',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'zone',
      Header: 'Zone',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'timestamp',
      Header: 'Date',
      cellProps: {
        className: 'text-break text-center'
      },
      Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy') || '-'
    },
    {
      accessor: 'charging_status',
      Header: 'Charging Status',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => (value === true ? 'True' : 'False' || '-')
    },
    {
      accessor: 'bat_volt',
      Header: 'Minimum Volt',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'low_bat_value',
      Header: 'Current Volt',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
    {
      accessor: 'bt_percent',
      Header: 'Battery Percentage',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => `${value}%` || '-'
    },
    {
      accessor: 'location',
      Header: 'Location',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ row }) => {
        const { lat, lon } = row.original;
        return lat && lon ? `Lat : ${lat}, Lon : ${lon}` : '-';
      }
    }
  ];

  return (
    <div className={`${window.innerWidth < 530 ? 'mt-0 ms-1' : 'mt-4'}`}>
      <div className="d-flex flex-row pt-3 flex-wrap">
        <div className="mb-3 d-flex">
          <label className="me-2 m-auto">From Date:</label>
          <DatePicker
            selected={fromDate}
            onChange={handleFromDateChange}
            dateFormat="dd/MM/yyyy"
            className="report-input fs--1"
            maxDate={new Date()}
            open={FromOpen}
            onInputClick={toggleFromOpen}
            onClickOutside={toggleFromOpen}
            onSelect={toggleFromOpen}
            readOnly
          />
          <span className="ms-1" onClick={toggleFromOpen}>
            <FaCalendarDays />
          </span>
        </div>
        <div className="mb-3 ms-4 d-flex">
          <label className="me-2 m-auto">To Date:</label>
          <DatePicker
            selected={toDate}
            onChange={handleToDateChange}
            dateFormat="dd/MM/yyyy"
            className="report-input fs--1"
            maxDate={new Date()}
            open={ToOpen}
            onInputClick={toggleToOpen}
            onClickOutside={toggleToOpen}
            onSelect={toggleToOpen}
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
        <div className="text-danger">Please enter a valid date.</div>
      )}
      {noData && (
        <div className="no-data-div">
          No Low battery report on the selected Date.
        </div>
      )}
      {isLoading && <div className="loading-spinner"></div>}
      {showTable && (
        <AdvanceTableWrapper
          columns={columns}
          data={LowBatteryData}
          selection
          sortable
          pagination
          perPage={PageCount}
        >
          <Card>
            <Card.Body>
              <ReportAdvanceTable
                table
                headerClassName="bg-200 text-900 text-wrap align-middle text-center "
                rowClassName="align-middle white-space-nowrap p-2 text-right fs--1"
                tableProps={{
                  size: 'sm',
                  striped: true,
                  className: 'fs--1 mb-0 overflow-hidden'
                }}
              />
              {LowBatteryData?.length > 20 ? (
                <ReportTablePagination table />
              ) : (
                ''
              )}
            </Card.Body>
          </Card>
        </AdvanceTableWrapper>
      )}
    </div>
  );
};

export default ReportLowBateryTable;
