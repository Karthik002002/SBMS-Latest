import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'react-bootstrap';
import { format, isBefore, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import { HistoryTrackingURL } from '../../../URL/url';
const MonitoringTable = ({
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
  const [FilteredVehicleData, setFilteredVehicleData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [HistoryQuery, setHistoryQuery] = useState(null);
  const [IMEI, setIMEI] = useState(null);
  const [FieldDateTime, setFieldDateTime] = useState({});
  const [invalidDate, setInvalidDate] = useState(false);
  const [DateTime, setDateTime] = useState({});

  useEffect(() => {
    if (ActiveCompany !== null && ActiveCompany !== 'null') {
      const filteredCompanyData = vehicleData.filter(
        data => data.companyName === ActiveCompany
      );
      setFilteredVehicleData(filteredCompanyData);
    } else {
      setFilteredVehicleData(vehicleData);
    }
  }, [ActiveCompany]);
  useEffect(() => {
    setFilteredVehicleData(vehicleData);
  }, [vehicleData]);

  const handleDateChange = (date, fieldName) => {
    setFieldDateTime({ ...FieldDateTime, [fieldName]: date });
    const formattedDateTime = format(date, 'yyyy/MM/dd HH:mm:ss');
    setDateTime({ ...DateTime, [fieldName]: formattedDateTime });
  };
  const isBeforeDateTime = (fromDate, toDate) => {
    return fromDate.getTime() < toDate.getTime();
  };

  useEffect(() => {
    if (FieldDateTime.FromDateTime && FieldDateTime.ToDateTime) {
      const fromDateTime = new Date(DateTime.FromDateTime);
      const toDateTime = new Date(DateTime.ToDateTime);
      if (isBeforeDateTime(toDateTime, fromDateTime)) {
        setInvalidDate(true);
        return;
      } else {
        setInvalidDate(false);
        console.log(
          `${HistoryTrackingURL}/?from_datetime=${DateTime.FromDateTime}&to_datetime=${DateTime.ToDateTime}&imei=${IMEI}`
        );
      }
    }
  }, [FieldDateTime]);
  return (
    <div>
      <div className="table-responsive scrollbar monitoring-list-table">
        <Table {...getTableProps(tableProps)}>
          {/* <thead className={headerClassName}>
          <tr>
            {headers.map((column, index) => (
              <th
                key={index}
                {...column.getHeaderProps(
                  column.getSortByToggleProps(column.headerProps)
                )}
              >
                {column.render('Header')}
                {column.canSort ? (
                  column.isSorted ? (
                    column.isSortedDesc ? (
                      <span className="sort desc" />
                    ) : (
                      <span className="sort asc" />
                    )
                  ) : (
                    <span className="sort" />
                  )
                ) : (
                  ''
                )}
              </th>
            ))}
          </tr>
        </thead> */}
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
          Select Vehicle :{' '}
          <Form.Select
            onChange={e => setSelectedVehicle(e.target.value)}
            className="tracking-vehicle-select"
          >
            {FilteredVehicleData.map(data => (
              <option value={data.vehicleName}>{data.vehicleName}</option>
            ))}
          </Form.Select>
        </div>
        <div>
          <div className="from-date-tracking">
            From Date :
            <DatePicker
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mmaa"
              selected={FieldDateTime?.FromDateTime}
              selectsStart
              maxDate={new Date()}
              onChange={date => handleDateChange(date, 'FromDateTime')}
            />
          </div>
          <div className="to-date-tracking">
            <p className="ms-2  " style={{ display: 'contents' }}>
              To Date :
            </p>

            <DatePicker
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mmaa"
              selected={FieldDateTime?.ToDateTime}
              selectsStart
              maxDate={new Date()}
              onChange={date => handleDateChange(date, 'ToDateTime')}
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
          </div>
        </div>
      </div>
    </div>
  );
};
MonitoringTable.propTypes = {
  getTableProps: PropTypes.func,
  headers: PropTypes.array,
  page: PropTypes.array,
  prepareRow: PropTypes.func,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  tableProps: PropTypes.object
};

export default MonitoringTable;
