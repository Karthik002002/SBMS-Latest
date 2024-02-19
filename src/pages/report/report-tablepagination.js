/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Flex from 'components/common/Flex';
import React from 'react';
import { Button } from 'react-bootstrap';

export const ReportTablePagination = ({
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  pageCount,
  pageIndex,
  gotoPage
}) => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Button
        size="sm"
        variant="falcon-default"
        onClick={() => previousPage()}
        className={classNames({ disabled: !canPreviousPage }) + ' me-2'}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </Button>
      <div
        className="pagination-container"
      >
        {/* "Start" button */}
        {/* <Button
          size="sm"
          variant="falcon-default"
          className="page"
          onClick={() => gotoPage(0)}
          disabled={pageIndex === 0}
          style={{ marginLeft: '8px' }}
        >
          Start
        </Button> */}

        <div className="pagination-scrollable  mt-2">
          <ul
            className="pagination  mx-2 pt-2"
          >
            {/* Page buttons */}
            {Array.from(Array(pageCount).keys()).map(page => (
              <li
                key={page}
                className={classNames({ active: pageIndex === page })}
              >
                <Button
                  size="sm"
                  variant="falcon-default"
                  className="page me-2"
                  onClick={() => gotoPage(page)}
                >
                  {page + 1}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* "End" button */}
        {/* <Button
          size="sm"
          variant="falcon-default"
          className="page"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={pageIndex === pageCount - 1}
          style={{ marginRight: '8px' }}
        >
          End
        </Button> */}
      </div>

      <Button
        size="sm"
        variant="falcon-default"
        onClick={() => nextPage()}
        className={classNames({ disabled: !canNextPage }) + ' ms-2'}
      >
        <FontAwesomeIcon icon="chevron-right" />
      </Button>
    </Flex>
  );
};

export default ReportTablePagination;
