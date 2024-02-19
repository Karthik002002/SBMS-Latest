import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import BasicECharts from 'components/common/BasicEChart';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components';
import { getColor, rgbaColor } from 'helpers/utils';

echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart]);

const SaasActiveUser = () => {
  const [Totalusers, setTotalusers] = useState(0);
  useEffect(() => {
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    fetch(
      'https://sbmsadmin.elenageosys.com/vehicle-management/totalusers/count/',
      {
        headers: {
          Authorization: 'token ' + loggedInUser.token
        }
      }
    )
      .then(res => res.json())
      .then(data => setTotalusers(data))
      .catch(err => console.log(err));
  }, []);
  return (
    <Card className="h-100">
      <Card.Body>
        <Row className="flex-between-center g-0">
          <Col xs={6} className="d-lg-block flex-between-center">
            <h6 className="mb-2 text-900">Total Users</h6>
            <h4 className="fs-3 fw-normal text-700 mb-0">{Totalusers}</h4>
          </Col>
          <Col xs="auto" className="h-100">
            <BasicECharts
              echarts={echarts}
              options={{
                xAxis: {
                  show: false,
                  boundaryGap: false
                },
                series: [
                  {
                    data: [3, 7, 6, 8, 5, 12, 11],
                    type: 'line',
                    symbol: 'none',
                    areaStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: rgbaColor(getColor('primary'), 0.25)
                          },
                          {
                            offset: 1,
                            color: rgbaColor(getColor('primary'), 0)
                          }
                        ]
                      }
                    }
                  }
                ],
                grid: { right: '0px', left: '0px', bottom: '0px', top: '0px' }
              }}
              style={{ height: '50px', minWidth: '80px' }}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

SaasActiveUser.propTypes = {
  // data: PropTypes.array.isRequired
};

export default SaasActiveUser;
