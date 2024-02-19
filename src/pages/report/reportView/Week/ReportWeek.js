import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReportBar from 'pages/report/report-right-bar';
import ReportWeekTable from './ReportWeeklyTable';
import ReportFooter from 'components/footer/ReportFooter';

const ReportWeek = () => {
  return (
    <>
      <Row>
        <Col xs={2} sm={2} md={2}>
          <ReportBar />
        </Col>
        <Col xs={10} sm={10} md={10}>
          <ReportWeekTable />
          <div>
            <ReportFooter />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default ReportWeek;
