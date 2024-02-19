import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import SoftBadge from 'components/common/SoftBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import CountUp from 'react-countup';
import axios from 'axios';
import sunrise from '../../assets/img/weather/sunrise.png';
import sunset from '../../assets/img/weather/sunset.png';
import weatherIcon from '../../assets/img/icons/weather-icon.png';

const Sun = () => {
  const [sunRise, setSunRise] = useState('');
  const [sunSet, setSunSet] = useState('');

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axios.get(
          `https://api.sunrise-sunset.org/json?lat=13&lng=77`
        );

        // console.log(new Date(Date.parse(res.data.results.sunrise)));
        //   console.log(res.data.results.sunrise);
        setSunRise(res.data.results.sunrise);
        setSunSet(res.data.results.sunset);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const date = new Date();
  let newDate = date.getUTCFullYear();
  // console.log(newDate);

  // sunrise
  let sunRiseDateUTC = new Date(`${newDate} ${sunRise}`);
  sunRiseDateUTC = sunRiseDateUTC.getTime();
  let sunRiseDateIST = new Date(sunRiseDateUTC);
  sunRiseDateIST.setHours(sunRiseDateIST.getHours() + 5);
  sunRiseDateIST.setMinutes(sunRiseDateIST.getMinutes() + 30);

  const sunRiseHours = sunRiseDateIST.getHours();
  const sunRiseMinutes = sunRiseDateIST.getMinutes();
  const sunRiseSeconds = sunRiseDateIST.getSeconds();

  let sunRiseTime = `${sunRiseHours}:${sunRiseMinutes}:${sunRiseSeconds}`;

  // sunset
  // sunrise
  let sunSetDateUTC = new Date(`${newDate} ${sunSet}`);
  sunSetDateUTC = sunSetDateUTC.getTime();
  let sunSetDateIST = new Date(sunSetDateUTC);
  sunSetDateIST.setHours(sunSetDateIST.getHours() + 5);
  sunSetDateIST.setMinutes(sunSetDateIST.getMinutes() + 30);

  const sunSetHours = sunSetDateIST.getHours();
  const sunSetMinutes = sunSetDateIST.getMinutes();
  const sunSetSeconds = sunSetDateIST.getSeconds();

  let sunSetTime = `${sunSetHours}:${sunSetMinutes}:${sunSetSeconds}`;

  return (
    <div>
      <Card className="">
        <Card.Body>
          <Row className="text-center">
            <Col md={4} sm={4}>
              <img className="ms-3" src={weatherIcon} alt="" height="60" />
            </Col>
            <Col md={8} sm={8}>
              <div className="d-md-flex d-lg-flex d-flex justify-content-center">
                <div className="d-flex">
                  <h6 className="mb-md-0 mb-lg-2 mt-1 ms-1">Sunrise</h6>
                  <img
                    src={sunrise}
                    width={20}
                    height={20}
                    className="ms-1"
                  ></img>
                </div>
                <div className="ms-3">
                  <SoftBadge bg="success" pill>
                    <span>{sunRiseTime}</span>
                  </SoftBadge>
                </div>
              </div>
              <div className="d-md-flex d-lg-flex d-flex justify-content-center">
                <div className="d-flex">
                  <h6 className="mb-md-0 mb-lg-2 mt-1 ">Sunset</h6>
                  <img
                    src={sunset}
                    width={20}
                    height={20}
                    className="ms-1"
                  ></img>
                </div>
                <div className="ms-3">
                  <SoftBadge bg="success" pill>
                    <span>{sunSetTime}</span>
                  </SoftBadge>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sun;
