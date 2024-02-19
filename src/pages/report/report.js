import React from 'react';
import ReportBar from './report-right-bar';
import { Col, Row } from 'react-bootstrap';
import ReportTable from './report-table';

const Report = () => {
  return (
    <>
      <Row>
        <Col sm={12} md={2}>
          <ReportBar />
        </Col>
        <Col sm={12} md={10}>
          <ReportTable />
        </Col>
      </Row>
    </>
  );
};

export default Report;
