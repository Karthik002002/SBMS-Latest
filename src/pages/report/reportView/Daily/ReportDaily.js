import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReportDailyTable from './ReportDailyTable';
import ReportBar from 'pages/report/report-right-bar';
import ReportFooter from 'components/footer/ReportFooter';

const ReportDaily = () => {
  return (
    <>
      <Row>
        <Col xs={2} sm={2} md={2}>
          <ReportBar />
        </Col>
        <Col xs={10} sm={10} md={10}>
          <ReportDailyTable />
          <div>
            <ReportFooter />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ReportDaily;
