import React, { useState, useEffect } from 'react';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Button, Card } from 'react-bootstrap';
import ReportAdvanceTable from 'pages/report/report-advancetable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import ReportTablePagination from 'pages/report/report-tablepagination';
import { FaCalendarDay } from 'react-icons/fa6';
import { useListFilterContext } from 'context/FilterContext';
import useDatePicker from 'pages/report/DatePickerHandler';

const ReportDailyTable = () => {
  const [Open, toggleOpen] = useDatePicker(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDailyURL, setSelectedDailyURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [DailyData, setDailyData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [resetDate, setResetDate] = useState(false);
  const [noData, setNoData] = useState(false);
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  const { PageCount } = useListFilterContext();

  //handle date changes
  const handleDateChange = date => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setNoData(false);
      setIsLoading(true);
      setShowTable(false);
      const year = date.getFullYear();
      const month = parseInt(String(date.getMonth() + 1).padStart(2, '0'), 10); // Months are zero-based
      const day = parseInt(String(date.getDate()).padStart(2, '0'), 10);

      const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
        day < 10 ? '0' : ''
      }${day}`;
      setSelectedDailyURL(
        `https://bmsadmin.elenageosys.com/record/generate_report/?from=${formattedDate}&to=${formattedDate}`
      );
      setSelectedDate(date);
    } else {
      console.error('Invalid date object');
      setSelectedDate(null);
    }
  };

  //handle Reset
  const handleReset = () => {
    setSelectedDate(null);
    setNoData(false);
    setShowTable(false);
    setResetDate(false);
  };

  //handle today button which sets the current day date
  const handleToday = () => {
    setIsLoading(true);
    setNoData(false);
    setShowTable(false);
    setResetDate(true);
    const today = new Date();
    const year = today.getFullYear();
    const month = parseInt(String(today.getMonth() + 1).padStart(2, '0'), 10);
    const day = parseInt(String(today.getDate()).padStart(2, '0'), 10);
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
      day < 10 ? '0' : ''
    }${day}`;
    setSelectedDailyURL(
      `https://bmsadmin.elenageosys.com/record/generate_report/?from=${formattedDate}&to=${formattedDate}`
    );
    setSelectedDate(today);
  };

  //Retrieve selected date data from the API.
  useEffect(() => {
    if (selectedDate !== null) {
      const fetchData = async () => {
        if (selectedDailyURL !== null) {
          try {
            const [selectedDateData] = await Promise.all([
              fetch(selectedDailyURL, {
                method: 'GET',
                headers: { Authorization: `token ${userToken.token}` }
              })
            ]);
            if (!selectedDateData.ok) {
              throw new Error(`Error on getting the Monthly API`);
              return;
            }

            const [selectedDateDataResponse] = await Promise.all([
              selectedDateData.json()
            ]);

            if (selectedDateDataResponse.length === 0) {
              setNoData(true);
              setIsLoading(false);
              setResetDate(true);
              return;
            }
            setDailyData(selectedDateDataResponse);
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
  }, [selectedDate]);

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
        className: ' text-break text-center'
      },
      Cell: ({ value }) =>
        format(new Date(value), 'dd/MM/yyyy hh:mm:ss a') || '-'
    },
    {
      accessor: 'light_status',
      Header: 'Light Status',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => (value === 0 ? 'True' : 'False' || '-')
    },
    {
      accessor: 'geofence_status',
      Header: 'GeoFence Status',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => (value === true ? 'True' : 'False' || '-')
    },
    {
      accessor: 'bt_volt',
      Header: 'Battery Voltage',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => `${value} V` || '-'
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
      <div className="d-flex pt-3">
        <div className="mb-3 d-flex">
          <label className="me-2 m-auto">Select Date:</label>
          <DatePicker
            open={Open}
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="fs--1 report-input"
            maxDate={new Date()}
            onInputClick={toggleOpen}
            onClickOutside={toggleOpen}
            onSelect={toggleOpen}
            readOnly
          />
          <span className="ms-2" onClick={toggleOpen}>
            <FaCalendarDay />
          </span>
        </div>
        <div className="ms-2">
          <Button onClick={handleToday} className="fs--1 p-1 ps-2 pe-2">
            Today
          </Button>
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
      {noData && (
        <div className="no-data-div">
          No Data is found on the selected date.
        </div>
      )}
      {isLoading && <div className="loading-spinner"></div>}
      {showTable && (
        <AdvanceTableWrapper
          columns={columns}
          data={DailyData}
          selection
          sortable
          pagination
          perPage={PageCount}
        >
          <Card>
            <Card.Body className="pb-1">
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
              {DailyData.length > 20 ? <ReportTablePagination table /> : ''}
            </Card.Body>
          </Card>
        </AdvanceTableWrapper>
      )}
    </div>
  );
};

export default ReportDailyTable;
