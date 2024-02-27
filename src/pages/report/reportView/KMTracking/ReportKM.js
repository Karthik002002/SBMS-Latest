import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import ReportBar from '../../report-right-bar';
import ReportFooter from 'components/footer/ReportFooter';
import ReportKMTable from './ReportKMTable';
import { useListFilterContext } from 'context/FilterContext';

const ReportKMTracking = () => {
  const { setHistoryTrackingActive } = useListFilterContext();
  useEffect(() => {
    setHistoryTrackingActive(false);
  }, []);
  return (
    <>
      <Row>
        <Col xs={0} sm={2} md={2}>
          <ReportBar />
        </Col>
        <Col xs={12} sm={10} md={10}  className={`${window.innerWidth < 530? 'p-2':''}`}>
          <ReportKMTable />
          <div>
            <ReportFooter />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ReportKMTracking;
