import React, { useState, useEffect } from 'react';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import { Button, Card } from 'react-bootstrap';
import ReportAdvanceTable from 'pages/report/report-advancetable';
// import DatePicker from 'react-multi-date-picker';
import DatePicker from 'react-datepicker';
import { startOfWeek, endOfWeek, format, parseISO } from 'date-fns';
import ReportTablePagination from 'pages/report/report-tablepagination';
import { FaCalendarWeek } from 'react-icons/fa6';
import { useListFilterContext } from 'context/FilterContext';
import useDatePicker from 'pages/report/DatePickerHandler';

const ReportWeekTable = () => {
  const [Open, toggleOpen] = useDatePicker();
  const [selectedWeek, setSelectedWeek] = useState({});
  const [filteredWeekData, setFilteredWeekData] = useState([]);
  const [selectedWeekURL, setSelectedWeekURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [resetWeek, setResetWeek] = useState(false);
  const [noData, setNoData] = useState(false);
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 0 });
  const { PageCount } = useListFilterContext();
  //handle week date change
  // const handleWeekChange = value => {
  //   setNoData(false);
  //   setIsLoading(true);
  //   setShowTable(false);
  //   console.log(new Date(value[0]));
  //   if (value && Array.isArray(value) && value.length === 2) {
  //     const startOfWeek = new Date(value[0]);
  //     const endOfWeek = new Date(value[1]);

  //     //Format the start date and the end date for handling data
  //     if (!isNaN(startOfWeek.getTime()) && !isNaN(endOfWeek.getTime())) {
  //       const formattedStart = format(startOfWeek, 'yyyy-MM-dd HH:mm:ss');
  //       const formattedEnd = format(endOfWeek, 'yyyy-MM-dd HH:mm:ss');

  //       const selectedWeekDate = {
  //         start: formattedStart,
  //         end: formattedEnd
  //       };
  //       setSelectedWeekURL(
  //         `https://bmsadmin.elenageosys.com/record/generate_report/?from=${
  //           formattedStart.split(' ')[0]
  //         }&to=${formattedEnd.split(' ')[0]}`
  //       );
  //       setSelectedWeek(selectedWeekDate);
  //     } else {
  //       console.error('Invalid date objects');
  //       setSelectedWeek(null);
  //     }
  //   } else {
  //     console.error('Invalid value format');
  //     setSelectedWeek(null);
  //   }
  // };

  const handleWeekChange = date => {
    setNoData(false);
    setIsLoading(true);
    setShowTable(false);
    if (date) {
      const startOfWeekDate = startOfWeek(date, { weekStartsOn: 0 }); // Sunday as start of week
      const endOfWeekDate = endOfWeek(date, { weekStartsOn: 0 }); // Sunday as start of week

      // Format the start and end dates for handling data
      const formattedStart = format(startOfWeekDate, 'yyyy-MM-dd');
      const formattedEnd = format(endOfWeekDate, 'yyyy-MM-dd');
      setSelectedWeek(`${formattedStart} - ${formattedEnd}`);
      setSelectedWeekURL(
        `https://bmsadmin.elenageosys.com/record/generate_report/?from=${formattedStart}&to=${formattedEnd}`
      );
    }
  };
  // Reset Function
  const handleReset = () => {
    setSelectedWeek({});
    setSelectedWeekURL(null);
    setResetWeek(false);
    setNoData(false);
    setShowTable(false);
    setIsLoading(false);
  };

  //Retrieve selected date data from the API.
  useEffect(() => {
    // Call the API when the week is selected
    const fetchData = async () => {
      if (selectedWeekURL !== null) {
        try {
          const [selectedWeekData] = await Promise.all([
            fetch(selectedWeekURL, {
              method: 'GET',
              headers: { Authorization: `token ${userToken.token}` }
            })
          ]);
          if (!selectedWeekData.ok) {
            throw new Error(`Error on getting the Monthly API`);
            return;
          }
          const [selectedWeekDataResponse] = await Promise.all([
            selectedWeekData.json()
          ]);

          if (selectedWeekDataResponse.length === 0) {
            setNoData(true);
            setIsLoading(false);
            setResetWeek(true);
            return;
          }
          setFilteredWeekData(selectedWeekDataResponse);
          setShowTable(true);
          setIsLoading(false);
          setResetWeek(true);
        } catch (error) {
          console.error(`HTTP Error :`, error);
        }
      }
    };
    fetchData();
  }, [selectedWeek]);

  //columns for the table
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
      cellProps: {
        className: 'text-break text-center'
      },
      Cell: ({ value }) =>
        value ? format(parseISO(value), 'dd-MM-yyyy hh:mm:ss a') : '-'
    },
    {
      accessor: 'light_status',
      Header: 'Light Status',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => (value === 0 ? 'False' : 'True' || '-')
    },
    {
      accessor: 'charging_status',
      Header: 'Charging status',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => (value === 0 ? 'False' : 'True' || '-')
    },
    {
      accessor: 'alt',
      Header: 'Altitude',
      cellProps: { className: 'text-break text-center' },
      Cell: ({ value }) => `${value} m` || '-'
    },
    {
      accessor: 'bt_volt',
      Header: 'Voltage',
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
    <div className={`${window.innerWidth < 530 ? 'mt-0 ms-1' : 'mt-4 '}`}>
      <div className="d-flex pt-3 ps-1">
        <div className="mb-3 d-flex">
          <label className="me-2 m-auto">Select Week:</label>
          <DatePicker
            value={selectedWeek}
            onChange={handleWeekChange}
            dateFormat="dd/MM/yyyy"
            maxDate={endOfCurrentWeek}
            showWeekNumbers
            showWeekPicker
            className="fs--1 report-week-input"
            open={Open}
            onInputClick={toggleOpen}
            onClickOutside={toggleOpen}
            onSelect={toggleOpen}
            readOnly
          />
          <span className="ms-2" onClick={toggleOpen}>
            <FaCalendarWeek />
          </span>
        </div>

        <div className="">
          {resetWeek && (
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
        <div className="no-data-div">No Data found on the selected Week.</div>
      )}
      {isLoading && <div className="loading-spinner"></div>}

      {showTable && (
        <AdvanceTableWrapper
          columns={columns}
          data={filteredWeekData}
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
              {filteredWeekData.length !== 0 && filteredWeekData.length > 20 ? (
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

export default ReportWeekTable;
