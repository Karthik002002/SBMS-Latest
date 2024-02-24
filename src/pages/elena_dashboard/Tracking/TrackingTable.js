import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Table } from 'react-bootstrap';
import { format, isBefore, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import { HistoryTrackingURL } from '../../../URL/url';
import { useListFilterContext } from 'context/FilterContext';
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
    setIMEIURL(selectedVehicleIMEI?.imei || null);
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
    if (DateTime.FromDateTime && DateTime.ToDateTime && IMEIURL) {
      const fromDateTime = new Date(DateTime.FromDateTime);
      const toDateTime = new Date(DateTime.ToDateTime);
      if (isBeforeDateTime(toDateTime, fromDateTime)) {
        setInvalidDate(true);
        return;
      } else {
        setInvalidDate(false);
        setHistoryTrackingURL(
          `${HistoryTrackingURL}?from=${DateTime.FromDateTime}&to=${DateTime.ToDateTime}&imei=${IMEIURL}`
        );
        setHistoryTrackingActive(true);
      }
    }
  }, [FieldDateTime, DateTime, IMEIURL]);
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
        <div>
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
              onSelect={() => console.log('Closed')}
            />
          </div>
          <div>
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
            <div className="tracking-history-clr-btn">
              {HistoryTrackingActive && (
                <Button
                  variant="danger"
                  onClick={() => {
                    setHistoryTrackingActive(false);
                    setHistoryTrackingURL(null);
                    setDateTime({});
                    setFieldDateTime({});
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
