import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import ReportBar from '../../report-right-bar';
import ReportFooter from 'components/footer/ReportFooter';
import ReportDriftedTable from './ReportDriftedTable';
import { useListFilterContext } from 'context/FilterContext';

const ReportKMTracking = () => {
  const { setHistoryTrackingActive } = useListFilterContext();
  useEffect(() => {
    setHistoryTrackingActive(false);
  }, []);
  return (
    <>
      <Row>
        <Col xs={2} sm={2} md={2}>
          <ReportBar />
        </Col>
        <Col xs={10} sm={10} md={10}>
          <ReportDriftedTable />
          <div>
            <ReportFooter />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ReportKMTracking;
