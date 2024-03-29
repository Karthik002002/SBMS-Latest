import IconButton from 'components/common/IconButton';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const   SidebarTableHeader = ({ selectedRowIds }) => {
  // const [tabs, setTabs] = useState('hello');

  return (
    <Row className="flex-between-center">
      <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
        <h6 className="fs-0 mb-0 text-nowrap py-2 py-xl-0 ms-2 text-center p-2">Vehicle List</h6>
      </Col>
      <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
        {Object.keys(selectedRowIds).length > 0 ? (
          <div className="d-flex">
            {/* <Form.Select size="sm" aria-label="Bulk actions">
              <option>Bulk Actions</option>
              <option value="refund">Refund</option>
              <option value="delete">Delete</option>
              <option value="archive">Archive</option>
            </Form.Select> */}
          </div>
        ) : (
          <div id="orders-actions">
            {/* <IconButton
              variant="falcon-default"
              size="sm"
              icon="plus"
              transform="shrink-3"
            >
              <span className="d-none d-sm-inline-block ms-1">New</span>
            </IconButton> */}

            {/* <IconButton
              variant="falcon-default"
              size="sm"
              icon="filter"
              transform="shrink-3"
              className="mx-2"
            >
              <span className="d-none d-sm-inline-block ms-1">Filter</span>
            </IconButton> */}

            {/* <IconButton
              variant="falcon-default"
              size="sm"
              icon="external-link-alt"
              transform="shrink-3"
            >
              <Link to="/trackingpage">
                <span className="d-none d-sm-inline-block ms-1">Track</span>
              </Link>
            </IconButton> */}
          </div>
        )}
      </Col>
    </Row>
  );
};

// CustomersTableHeader.propTypes = {
//   selectedRowIds: PropTypes.object
// };

export default SidebarTableHeader;
