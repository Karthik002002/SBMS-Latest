import React from 'react';
import TotalSales from './TotalSales';
import DoughnutRoundedChart from './DoughnutRoundedChart';
import GradientBarChart from './GradientBarChart';
import Customers from './table/Customers';
import * as _default from './default';
import { Row, Col } from 'react-bootstrap';
import StackedHorizontalChart from './StackedHorizontalChart';
import CandlestickMixedChart from './CandlestickMixedChart';
import RaceChart from './RaceChart';

const VehicleDashboard = () => {
  return (
    <>
      <div className="mt-5">
        <Row className="mb-5">
          <StackedHorizontalChart />
        </Row>
        <Row className="mt-5">
          <Col md={6} className="mb-5">
            <DoughnutRoundedChart />
          </Col>
          <Col md={6} className="mb-5">
            <GradientBarChart />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-5">
            <CandlestickMixedChart />
          </Col>
          <Col md={6} className="mb-5">
            <RaceChart />
          </Col>
        </Row>
        <Row className="mt-5">
          <TotalSales data={_default.totalSales} />
        </Row>
      </div>
      <div className="my-5">
        <Customers />
      </div>
    </>
  );
};

export default VehicleDashboard;
