import ReportBar from 'pages/report/report-right-bar';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReportMonthTable from './ReportMonthlyTable';
import ReportFooter from 'components/footer/ReportFooter';

const ReportMonth = () => {
  return (
    <>
      <Row className="">
        <Col xs={2} sm={2} md={2}>
          <ReportBar />
        </Col>
        <Col xs={10} sm={10} md={10}>
          <ReportMonthTable />
          <div>
            <ReportFooter />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ReportMonth;
