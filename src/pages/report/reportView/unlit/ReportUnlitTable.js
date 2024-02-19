import React, { useState, useEffect } from 'react';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Button, Card } from 'react-bootstrap';
import ReportAdvanceTable from 'pages/report/report-advancetable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfDay, endOfDay, format, isBefore } from 'date-fns';
import { useListFilterContext } from 'context/FilterContext';
import { FaCalendarDays } from 'react-icons/fa6';
import useDatePicker from 'pages/report/DatePickerHandler';

const ReportUnlitTable = () => {
  const [fromOpen, toggleFromOpen] = useDatePicker(false);
  const [toOpen, toggleToOpen] = useDatePicker(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [UnLitQuery, setUnLitQuery] = useState(null);
  const [UnLitData, setUnLitData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [resetDate, setResetDate] = useState(false);
  const [noData, setNoData] = useState(false);
  const [InvalidDate, setInvalidDate] = useState(false);
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  const { PageCount } = useListFilterContext();
  //handling date changes
  const handleFromDateChange = date => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setFromDate(date);
      setUnLitQuery(null);
    } else {
      console.error('Invalid date object');
      setFromDate(null);
    }
  };

  const handleToDateChange = date => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setToDate(date);
      setUnLitQuery(null);
    } else {
      console.error('Invalid date object');
      setToDate(null);
    }
  };

  //handling Reset
  const handleReset = () => {
    setNoData(false);
    setShowTable(false);
    setFromDate(null);
    setToDate(null);
    setResetDate(false);
    setInvalidDate(false);
    setUnLitQuery(null);
  };

  //set the query according to the selected Date
  useEffect(() => {
    if (fromDate && toDate) {
      const fromDateFormatted = startOfDay(fromDate);
      const toDateFormatted = endOfDay(toDate);
      //validate the from and to Date
      if (isBefore(fromDateFormatted, toDateFormatted)) {
        setShowTable(false);
        setIsLoading(true);
        setNoData(false);
        setInvalidDate(false);
        const startOfDayDate = format(fromDateFormatted, 'yyyy-MM-dd');
        const endOfDayDate = format(toDateFormatted, 'yyyy-MM-dd');
        setUnLitQuery(
          `https://bmsadmin.elenageosys.com/unlit-report/get_report/?from=${startOfDayDate}&to=${endOfDayDate}`
        );
      } else {
        setUnLitQuery(null);
        setInvalidDate(true);
        setShowTable(false);
        setNoData(false);
        setIsLoading(false);
        setResetDate(true);
        setUnLitData([]);
      }
    }
  }, [fromDate, toDate]);

  //Retrieve selected date data from the API.
  useEffect(() => {
    if (fromDate && toDate && UnLitQuery !== null && !InvalidDate) {
      const fetchData = async () => {
        if (UnLitQuery !== null) {
          try {
            const [selectedDate] = await Promise.all([
              fetch(UnLitQuery, {
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
              setUnLitData([]);
              setNoData(true);
              setResetDate(true);
              setShowTable(false);
              setIsLoading(false);

              return;
            }
            setUnLitData(selectedDateResponse);
            setShowTable(true);
            setResetDate(true);
            setNoData(false);
            setIsLoading(false);
          } catch (error) {
            console.error(`HTTP Error :`, error);
          }
        }
      };
      fetchData();
    }
  }, [fromDate, toDate, UnLitQuery]);

  const columns = [
    {
      accessor: 'buoy_id',
      Header: 'Buoy ID',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
    },
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
      headerProps: { className: 'business-card-company' },
      cellProps: {
        className: 'business-card-company-cell text-break text-center'
      },
      Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy') || '-'
    },
    {
      accessor: 'location',
      Header: 'Location',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ row }) => {
        const { lat, lon } = row.original;
        return lat && lon ? `Lat : ${lat}, Lon : ${lon}` : '-';
      }
    },
    {
      accessor: 'lux_value',
      Header: 'Light Status',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => (value === 2 ? 'False' : '' || '')
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
            open={fromOpen}
            onInputClick={toggleFromOpen}
            onSelect={toggleFromOpen}
            onClickOutside={toggleFromOpen}
            readOnly
          />
          <span className="ms-1 " onClick={toggleFromOpen}>
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
            open={toOpen}
            onClickOutside={toggleToOpen}
            onInputClick={toggleToOpen}
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
          No Unlit report found on the selected Date.
        </div>
      )}
      {isLoading && <div className="loading-spinner"></div>}
      {showTable && (
        <AdvanceTableWrapper
          columns={columns}
          data={UnLitData}
          selection
          sortable
          pagination
          perPage={PageCount}
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
            </Card.Body>
          </Card>
        </AdvanceTableWrapper>
      )}
    </div>
  );
};

export default ReportUnlitTable;
