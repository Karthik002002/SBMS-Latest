import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const ReportAdvanceTable = ({
  getTableProps,
  headers,
  page,
  prepareRow,
  headerClassName,
  bodyClassName,
  rowClassName,
  tableProps
}) => {
  return (
    <div className="table-container" style={{ position: 'relative' }}>
      <div className="report-table-responsive scrollbar">
        <Table
          {...getTableProps(tableProps)}
          className=""
          style={{ minWidth: '-webkit-fill-available' }}
        >
          <thead
            className={headerClassName}
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 0,
              backgroundColor: 'white'
            }}
          >
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
          </thead>
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
    </div>
  );
};
ReportAdvanceTable.propTypes = {
  getTableProps: PropTypes.func,
  headers: PropTypes.array,
  page: PropTypes.array,
  prepareRow: PropTypes.func,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  tableProps: PropTypes.object
};

export default ReportAdvanceTable;
