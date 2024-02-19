import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReportBar from 'pages/report/report-right-bar';
import ReportUnlitTable from './ReportUnlitTable';
import ReportFooter from 'components/footer/ReportFooter';

const ReportUnlit = () => {
  return (
    <>
      <Row>
        <Col xs={2} sm={2} md={2}>
          <ReportBar />
        </Col>
        <Col xs={10} sm={10} md={10}>
          <ReportUnlitTable />
          <div>
            <ReportFooter />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ReportUnlit;
