import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import SoftBadge from 'components/common/SoftBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';

const SaasConversion = () => {
  const [totalrecords, setTotalrecords] = useState(0);
  useEffect(() => {
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    fetch(
      'https://sbmsadmin.elenageosys.com/vehicle-management/records/count/',
      {
        headers: {
          Authorization: 'token ' + loggedInUser.token
        }
      }
    )
      .then(res => res.json())
      .then(data => setTotalrecords(data))
      .catch(err => console.log(err));
  }, []);
  return (
    <Card className="h-100">
      <Card.Body>
        <Row className="flex-between-center">
          <Col className="d-md-flex d-lg-block flex-between-center">
            <h6 className="mb-md-0 mb-lg-2">Active Hours</h6>
            <SoftBadge bg="primary" pill>
              <FontAwesomeIcon icon="caret-up" /> 24
            </SoftBadge>
          </Col>
          <Col xs="auto">
            <h4 className="fs-3 fw-normal text-primary">
              <CountUp
                start={0}
                end={totalrecords / 360}
                suffix="Hrs"
                duration={2.75}
                decimals={2}
                decimal="."
              />
            </h4>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SaasConversion;
