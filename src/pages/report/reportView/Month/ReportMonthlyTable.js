import React, { useState, useEffect } from 'react';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Button, Card } from 'react-bootstrap';
import ReportAdvanceTable from 'pages/report/report-advancetable';
import DatePicker from 'react-datepicker';
import { format, parseISO, addMonths, isAfter, endOfMonth } from 'date-fns';
import ReportTablePagination from 'pages/report/report-tablepagination';
import { BsCalendar2MonthFill } from 'react-icons/bs';
import { useListFilterContext } from 'context/FilterContext';
import useDatePicker from 'pages/report/DatePickerHandler';

const ReportMonthTable = () => {
  const [Open, toggleOpen] = useDatePicker(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredMonthData, setFilteredMonthData] = useState([]);
  const [selectedMonthQuery, setSelectedMonthQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [resetMonth, setResetMonth] = useState(false);
  const [noData, setNoData] = useState(false);
  const [InvalidMonth, setInvalidMonth] = useState(false);
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  const endOfCurrentMonth = endOfMonth(new Date());
  const { PageCount } = useListFilterContext();

  //handling date
  const handleReset = () => {
    setShowTable(false);
    setSelectedMonth(null);
    setSelectedMonthQuery(null);
    setResetMonth(false);
    setNoData(false);
  };
  const handleFocus = () => {
    if (window.innerWidth <= 530) {
      document.activeElement.blur();
    }
  };
  const handleMonthChange = date => {
    if (isAfter(date, endOfCurrentMonth)) {
      setInvalidMonth(true);
      setShowTable(false);
      setNoData(false);
      setSelectedMonthQuery(null);
      setIsLoading(false);
      setSelectedMonth(null);
      return;
    }
    setIsLoading(true);
    setNoData(false);
    setShowTable(false);
    if (date) {
      const dateObject = new Date(date);
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
      // setIsLoading(true);
      setSelectedMonthQuery(
        `https://bmsadmin.elenageosys.com/record/generate_report/?month=${month}-${year}`
      );
      setInvalidMonth(false);
      setSelectedMonth(date);
    }
  };

  //Retrieve selected date data from the API.
  useEffect(() => {
    if (selectedMonth) {
      const fetchData = async () => {
        if (selectedMonthQuery !== null) {
          try {
            const [selectedMonthData] = await Promise.all([
              fetch(selectedMonthQuery, {
                method: 'GET',
                headers: { Authorization: `token ${userToken.token}` }
              })
            ]);
            if (!selectedMonthData.ok) {
              throw new Error(`Error on getting the Monthly API`);
              return;
            }
            const [selectedMonthDataResponse] = await Promise.all([
              selectedMonthData.json()
            ]);
            if (selectedMonthDataResponse.length === 0) {
              setNoData(true);
              setIsLoading(false);
              setResetMonth(true);
              return;
            }
            setFilteredMonthData(selectedMonthDataResponse);
            setShowTable(true);
            setIsLoading(false);
            setResetMonth(true);
          } catch (error) {}
        }
      };
      fetchData();
    }
  }, [selectedMonth]);

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
      Cell: ({ value }) => (value ? format(parseISO(value), 'dd-MM-yyyy') : '-')
    },
    {
      accessor: 'light_status',
      Header: 'Light Status',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => (value === 0 ? 'True' : 'False' || '-')
    },
    {
      accessor: 'charging_status',
      Header: 'Battery charging status',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => (value === 0 ? 'False' : 'True' || '-')
    },
    {
      accessor: 'bt_volt',
      Header: 'Voltage',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => value || '-'
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
          <label className="me-2 m-auto">Select Month:</label>

          <DatePicker
            showMonthYearPicker
            selected={selectedMonth}
            dateFormat="MM/yyyy"
            onChange={handleMonthChange}
            className="fs--1 report-input"
            open={Open}
            onInputClick={toggleOpen}
            onClickOutside={toggleOpen}
            onSelect={toggleOpen}
            readOnly
          />
          <span className="ms-2" onClick={toggleOpen}>
            <BsCalendar2MonthFill />
          </span>
        </div>

        <div>
          {resetMonth && (
            <Button
              variant="danger"
              onClick={handleReset}
              className="ms-2 fs--2 p-1 ps-2 pe-2"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {InvalidMonth && (
        <div className="text-danger">
          Please enter a month before or the current month.
        </div>
      )}
      {noData && (
        <div className="no-data-div">No data found on the selected Month.</div>
      )}
      {isLoading && <div className="loading-spinner"></div>}
      {showTable && (
        <AdvanceTableWrapper
          columns={columns}
          data={filteredMonthData}
          selection
          sortable
          pagination
          perPage={PageCount}
        >
          <Card>
            <Card.Body className="pe-2 pb-1">
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
              <ReportTablePagination table />
            </Card.Body>
          </Card>
        </AdvanceTableWrapper>
      )}
    </div>
  );
};

export default ReportMonthTable;
