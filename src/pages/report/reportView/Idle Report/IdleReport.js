import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import ReportBar from '../../report-right-bar';
import ReportFooter from 'components/footer/ReportFooter';
import { useListFilterContext } from 'context/FilterContext';
import ReportIdleTable from './IdleTable';

const ReportIdle = () => {
  const { setHistoryTrackingActive } = useListFilterContext();
  useEffect(() => {
    setHistoryTrackingActive(false);
  }, []);
  return (
    <>
      <Row>
        <Col xs={1} sm={2} md={2}>
          <ReportBar />
        </Col>
        <Col xs={11} sm={10} md={10}>
          <ReportIdleTable />
          <div>
            <ReportFooter />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ReportIdle;
