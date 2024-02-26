import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useListFilterContext } from 'context/FilterContext';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Col, Row, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomersTableHeader = ({ selectedRowIds, Schooldata, CompanyData }) => {
  const { setFilter, setCompanyFilter } = useListFilterContext();
  const [IsActiveFilter, setIsActiveFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = filter => {
    setFilter(filter);
    setSelectedFilter(filter);
    setIsActiveFilter(true);
  };
  const handleCompanyChange = filter => {
    setCompanyFilter(filter);
    setSelectedFilter(filter);
    setIsActiveFilter(true);
  };
  const clearFilters = () => {
    setIsActiveFilter(false);
    setFilter(null);
    setCompanyFilter(null);
  };
  return (
    <Row className="flex-between-center">
      <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
        <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0 ms-3">
          Vehicle List
        </h5>
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
            <Link to="/trackingpage">
              <Button
                type="button"
                variant="falcon-default"
                size="sm"
                className="ms-2"
              >
                Track
              </Button>
            </Link>
          </div>
        ) : (
          <div id="orders-actions" className="dashboard-filter d-flex">
            {IsActiveFilter && (
              <button
                onClick={clearFilters}
                className="btn me-2 filter-clear-btn pb-1"
              >
                Clear
              </button>
            )}
            <Dropdown>
              <Dropdown.Toggle
                variant="falcon-default"
                size="sm"
                className="mx-2"
                icon="filter"
              >
                <FontAwesomeIcon
                  variant="falcon-default"
                  size="sm"
                  icon="filter"
                  className="me-2 border-0"
                />
                {'Company'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {CompanyData?.map((filter, index) => (
                  <Dropdown.Item
                    key={index}
                    active={selectedFilter === filter}
                    onClick={() => handleCompanyChange(filter)}
                  >
                    {filter}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle
                variant="falcon-default"
                size="sm"
                className="mx-2"
                icon="filter"
              >
                <FontAwesomeIcon
                  variant="falcon-default"
                  size="sm"
                  icon="filter"
                  className="me-2 border-0"
                />
                {'School'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Schooldata.map((filter, index) => (
                  <Dropdown.Item
                    key={index}
                    active={selectedFilter === filter}
                    onClick={() => handleFilterChange(filter)}
                  >
                    {filter}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

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
      {/* {IsActiveFilter && (<span className="fs--2 ">Active Filter - {selectedFilter}</span>)} */}
    </Row>
  );
};

CustomersTableHeader.propTypes = {
  selectedRowIds: PropTypes.object
};

export default CustomersTableHeader;
