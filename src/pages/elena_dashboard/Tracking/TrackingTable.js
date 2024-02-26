import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Table } from 'react-bootstrap';
import { format, isBefore, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import { HistoryTrackingURL } from '../../../URL/url';
import { useListFilterContext } from 'context/FilterContext';
import { useWebSocket } from 'context/SocketContext';
const TrackingTable = ({
  getTableProps,
  headers,
  page,
  prepareRow,
  headerClassName,
  bodyClassName,
  rowClassName,
  tableProps,
  ActiveCompany,
  vehicleData
}) => {
  const {
    HistoryTrackingActive,
    setHistoryTrackingActive,
    setHistoryTrackingURL,
    setIMEI,
    setTrackingFilterCompany
  } = useListFilterContext();

  const [FilteredVehicleData, setFilteredVehicleData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [IMEIURL, setIMEIURL] = useState(null);
  const [Search, setSearch] = useState(false);
  const [FieldDateTime, setFieldDateTime] = useState({});
  const [invalidDate, setInvalidDate] = useState(false);
  const [DateTime, setDateTime] = useState({});

  useEffect(() => {
    setFilteredVehicleData(vehicleData);
  }, [vehicleData]);

  useEffect(() => {
    const selectedVehicleIMEI = vehicleData.find(
      data => data.vehicleName === selectedVehicle
    );
    console.log(selectedVehicleIMEI);
    setIMEIURL(selectedVehicleIMEI?.vehicle_id || null);
  }, [selectedVehicle]);

  const handleDateChange = (date, fieldName) => {
    setFieldDateTime({ ...FieldDateTime, [fieldName]: date });
    const formattedDateTime = format(date, 'yyyy/MM/dd HH:mm:ss');
    setDateTime({ ...DateTime, [fieldName]: formattedDateTime });
  };
  const isBeforeDateTime = (fromDate, toDate) => {
    return fromDate.getTime() < toDate.getTime();
  };

  useEffect(() => {
    if (DateTime.FromDateTime && DateTime.ToDateTime && IMEIURL && Search) {
      const fromDateTime = new Date(DateTime.FromDateTime);
      const toDateTime = new Date(DateTime.ToDateTime);
      if (isBeforeDateTime(toDateTime, fromDateTime)) {
        setInvalidDate(true);
        return;
      } else {
        setSearch(false);
        setInvalidDate(false);
        setHistoryTrackingURL(
          `${HistoryTrackingURL}?from=${DateTime.FromDateTime}&to=${DateTime.ToDateTime}&vehicl\e_id=${IMEIURL}`
        );
        setHistoryTrackingActive(true);
      }
    }
    setSearch(false);
  }, [DateTime, IMEIURL, Search]);
  return (
    <div>
      <div className="table-responsive scrollbar Tracking-list-table">
        <Table {...getTableProps(tableProps)}>
          <tbody className={bodyClassName}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} className={rowClassName} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        key={index}
                        {...cell.getCellProps(cell.column.cellProps)}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="tracking-filter">
        <div className="history-tracking-heading">History Tracking</div>
        <div className="vehicle-selection">
          <span className="vehicle-selection-text">Select</span>
          <Form.Select
            value={selectedVehicle}
            onChange={e => {
              setTrackingFilterCompany(e.target.value);
              setSelectedVehicle(e.target.value);
            }}
            className="tracking-vehicle-select"
          >
            <option>Select</option>
            {FilteredVehicleData.map(data => (
              <option value={data.vehicleName}>{data.vehicleName}</option>
            ))}
          </Form.Select>
        </div>
        <div className="history-tracking-input-container">
          <div className="from-date-tracking">
            From :
            <DatePicker
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mmaa"
              selected={FieldDateTime?.FromDateTime}
              selectsStart
              maxDate={new Date()}
              onChange={date => handleDateChange(date, 'FromDateTime')}
              timeIntervals={15}
            />
          </div>
          <div className="to-date-tracking">
            <p className="ms-2  " style={{ display: 'contents' }}>
              To :
            </p>

            <DatePicker
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mmaa"
              selected={FieldDateTime?.ToDateTime}
              selectsStart
              maxDate={new Date()}
              onChange={date => handleDateChange(date, 'ToDateTime')}
              className="tracking-to-date-selection"
              timeIntervals={15}
            />
          </div>
         
            {invalidDate && (
              <span
                style={{
                  color: 'red',
                  marginTop: '5px',
                  fontSize: '13px',
                  textAlign: 'center',
                  display: 'block'
                }}
              >
                Enter Valid Date & Time.
              </span>
            )}
          </div>
          <div>
            <div className="tracking-enter-button-container">
              <Button
                variant=""
                className="fs--1 history-tracking-button"
                onClick={() => {
                  setSearch(true);
                }}
              >
                Search
              </Button>
              <div
                className={`tracking-history-clr-btn${
                  HistoryTrackingActive ? '-active' : ''
                }`}
              >
                {HistoryTrackingActive && (
                  <Button
                    variant="danger"
                    className="fs--1"
                    onClick={() => {
                      setHistoryTrackingActive(false);
                      setHistoryTrackingURL(null);
                      setDateTime({});
                      setFieldDateTime({ FromDateTime: '', ToDateTime: '' });
                      setIMEI(null);
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
TrackingTable.propTypes = {
  getTableProps: PropTypes.func,
  headers: PropTypes.array,
  page: PropTypes.array,
  prepareRow: PropTypes.func,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  tableProps: PropTypes.object
};

export default TrackingTable;
