import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import SoftBadge from 'components/common/SoftBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import CountUp from 'react-countup';
import Sun from './Sun';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import {
  faCarBattery,
  faLightbulb,
  faLocationArrow,
  faTemperatureHigh,
  faWind
} from '@fortawesome/free-solid-svg-icons';

const WeatherDetails = ({ data }) => {
  const [lat, setLat] = useState(13);
  const [lon, setLon] = useState(77);
  const [weather, setWeather] = useState();
  const [ActiveBuoy, setActiveBuoy] = useState(data[0]);
  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b1f330e90b4edaeddc159757d63dc9ac`
        );
        setWeather(res.data);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, [lat, lon]);

  useEffect(() => {
    setActiveBuoy(data[0]); //Set the first data to the active state when the page is loaded
  }, [data]);
  // sunrise;
  let sunRiseDateUTC = new Date(weather ? weather.sys.sunrise * 1000 : ''); // Convert seconds to milliseconds
  sunRiseDateUTC.setUTCHours(sunRiseDateUTC.getUTCHours() + 5);
  sunRiseDateUTC.setUTCMinutes(sunRiseDateUTC.getUTCMinutes() + 30);

  const sunRiseHours = sunRiseDateUTC.getUTCHours();
  const sunRiseMinutes = sunRiseDateUTC.getUTCMinutes();
  const sunRiseSeconds = sunRiseDateUTC.getUTCSeconds();

  let sunRiseTime = `${sunRiseHours}:${sunRiseMinutes}:${sunRiseSeconds}`;

  // // sunset
  let sunSetDateUTC = new Date(weather ? weather.sys.sunset * 1000 : ''); // Convert seconds to milliseconds
  sunSetDateUTC.setUTCHours(sunSetDateUTC.getUTCHours() + 5);
  sunSetDateUTC.setUTCMinutes(sunSetDateUTC.getUTCMinutes() + 30);

  const sunSetHours = sunSetDateUTC.getUTCHours();
  const sunSetMinutes = sunSetDateUTC.getUTCMinutes();
  const sunSetSeconds = sunSetDateUTC.getUTCSeconds();

  let sunSetTime = `${sunSetHours}:${sunSetMinutes}:${sunSetSeconds}`;

  return (
    <>
      {/* <Sun /> */}
      <Card className="h-100 weather-card">
        {/* <FalconCardHeader /> */}
        <Card.Body className="pt-2 pb-0">
          <div className="d-flex justify-content-between align-items-center">
            <div className="ps-2">
              <h4 className="pt-2">{ActiveBuoy && ActiveBuoy.buoy_name}</h4>
            </div>
            <div className="d-flex">
              <Form.Select
                size="sm"
                onChange={e => {
                  setActiveBuoy(data[e.target.value]);
                  setLat(data[e.target.value].lat);
                  setLon(data[e.target.value].lon);
                }}
                style={{ maxWidth: '300px' }}
                className="me-2"
              >
                {data &&
                  data.map((data, index) => (
                    <option value={index} key={data.id}>
                      {data.buoy_id}
                    </option>
                  ))}
              </Form.Select>
            </div>
          </div>

          <Row className="g-0 h-100 align-items-start mb-1">
            <Col sm={12} lg={2} md={2} className="text-center">
              {weather && weather.weather && weather.weather[0] && (
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  height={150}
                  width={150}
                />
              )}
            </Col>

            <Col sm={12} lg={3} md={2} className="weather  ">
              <div className="mb-2">
                <h4 className="mb-2 ">Weather</h4>
                <SoftBadge pill className="ms-2 text-wrap weather-wind word-padding">
                  <span className="weather-key"> Weather :</span>{' '}
                  <span className="weather-value">
                    {weather ? weather.weather[0].description : ''}
                  </span>
                </SoftBadge>
                {/* <div className="fs--2 fw-semi-bold">
                  <div className="text-warning">condition</div>
                  Precipitation: precipitation
                </div> */}
                <div className="mb-2 wind mt-2">
                  <h4 className="mb-2">Wind</h4>
                  <SoftBadge
                    pill
                    className=" text-wrap word-break ms-2 word-padding weather-wind"
                  >
                    <span className="weather-key ">
                      <FontAwesomeIcon icon={faWind} className="me-1" /> Speed :
                    </span>{' '}
                    <span className="weather-value">
                      {weather ? weather.wind.speed + ' m/s' : ''}
                    </span>
                  </SoftBadge>
                  {/* <div className="fs--2 fw-semi-bold">
                  <div className="text-warning">condition</div>
                  Precipitation: precipitation
                </div> */}
                </div>
              </div>
            </Col>
            {/* <Col sm={12} lg={1} md={2} className="wind">
              
            </Col> */}
            <Col sm={12} lg={4} md={2} className="other-weather-details">
              <div>
                <h4 className="mb-2">Others</h4>
                <SoftBadge
                  pill
                  className="ms-2 text-wrap word-padding other-width"
                >
                  <span className="weather-key">
                    {' '}
                    <FontAwesomeIcon
                      icon={faTemperatureHigh}
                      className="me-1 weather-key"
                    />
                    Temp :
                  </span>{' '}
                  <span className="weather-value">
                    {weather
                      ? (weather.main.temp - 273.15).toFixed(2) + '° C'
                      : ''}
                  </span>
                </SoftBadge>
                <SoftBadge
                  pill
                  className="ms-2 text-wrap word-padding other-width"
                >
                  <span className="weather-key"> Pressure :</span>{' '}
                  <span className="weather-value">
                    {weather ? weather.main.pressure + ' hPa' : ''}
                  </span>
                </SoftBadge>
                <SoftBadge
                  pill
                  className="ms-2 text-wrap word-padding other-width"
                >
                  <span className="weather-key"> Humidity :</span>{' '}
                  <span className="weather-value">
                    {weather ? weather.main.humidity + '%' : ''}
                  </span>
                </SoftBadge>
                {/* <div className="fs--2 fw-semi-bold">
                  <div className="text-warning">condition</div>
                  Precipitation: precipitation
                </div> */}
              </div>
            </Col>
            <Col sm={12} lg={4} md={2} className="status-weather-details">
              <div className="mb-2">
                <h4 className="mb-2">Status</h4>

                <div>
                  {/* <FontAwesomeIcon icon={FiBattery} /> */}
                  <SoftBadge
                    pill
                    className="ms-2 text-wrap word-padding location"
                  >
                    <span className="weather-key">
                      <FontAwesomeIcon icon={faCarBattery} className="me-1" />{' '}
                      Battery :{' '}
                    </span>{' '}
                    <span
                      className={`ms bg ${
                        ActiveBuoy && ActiveBuoy.bt_volt > 12
                          ? 'text-success'
                          : 'text-danger'
                      }   rounded-5 text-center px-2`}
                    >
                      {ActiveBuoy && ActiveBuoy.bt_volt + ' V'}
                    </span>
                  </SoftBadge>
                </div>
                <SoftBadge
                  pill
                  className="ms-2 text-wrap word-padding location"
                >
                  <span className="weather-key">
                    <FontAwesomeIcon icon={faLightbulb} className="me-1" />{' '}
                    Light :
                  </span>
                  <div className="d-flex flex-column">
                    <span
                      className={` bg ${
                        ActiveBuoy && ActiveBuoy.light_status === 0
                          ? 'text-danger'
                          : ActiveBuoy && ActiveBuoy.light_status === 1
                          ? 'text-success'
                          : 'text-warning'
                      }  text-center  light-ambient`}
                    >
                      A:{ActiveBuoy && ActiveBuoy.lux1}
                      {'   '}
                    </span>
                    <span
                      className={` ${
                        ActiveBuoy && ActiveBuoy.light_status === 0
                          ? 'text-danger'
                          : ActiveBuoy && ActiveBuoy.light_status === 1
                          ? 'text-success'
                          : 'text-warning'
                      }  pt-1 text-center  light-source`}
                    >
                      S:{ActiveBuoy && ActiveBuoy.lux2}
                    </span>
                  </div>
                </SoftBadge>

                <SoftBadge
                  pill
                  className="ms-2 text-wrap word-padding location"
                >
                  <div className="location-weather">
                    <span className="weather-key">
                      <FontAwesomeIcon
                        icon={faLocationArrow}
                        className="me-1"
                      />{' '}
                      Location :
                    </span>{' '}
                    <div className="d-flex flex-column">
                      <span
                        className={`bg ${
                          ActiveBuoy && ActiveBuoy.geofence_status === true
                            ? 'text-success'
                            : 'text-danger'
                        }  top-lat text-center px-2`}
                      >
                        Lat - {ActiveBuoy && ActiveBuoy.lat}
                      </span>
                      <span
                        className={`bg ${
                          ActiveBuoy && ActiveBuoy.geofence_status === true
                            ? 'text-success'
                            : 'text-danger'
                        }  top-lon  text-center px-2`}
                      >
                        Lon - {ActiveBuoy && ActiveBuoy.lon}
                      </span>
                    </div>
                  </div>
                </SoftBadge>
                {/* <div className="fs--2 fw-semi-bold">
                  <div className="text-warning">condition</div>
                  Precipitation: precipitation
                </div> */}
              </div>
            </Col>

            <Col
              sm={12}
              lg={3}
              md={3}
              className="d-flex align-self-center date-weather"
            >
              <div className="d-flex ">
                <div className="font-sans-serif text-primary mb-1 lh-1 mb-2 other-weather-details">
                  <h3 className=" mb-0 mt-2  date-weather">
                    Last Date of Maintenance:{' '}
                  </h3>
                  <span className=" fs--1  mb-1">02/02/2024</span>
                  <h3 className="date-weather mb-0 mt-2">
                    Last Date of Battery Change:{' '}
                  </h3>
                  <span className=" fs--1 mb-2 mt-1">02/02/2024</span>
                </div>
              </div>
              {/* <div className="d-flex">
                <div className="fs--1 text-800">
                  {weather ? weather.sys.sunrise : ''} &nbsp;
                </div>
                <div className="fs--1 text-800"></div>
              </div> */}
            </Col>
            <Col sm={12} lg={3} md={3} className=" align-self-center">
              <div className="sun-details fs-4 fw-normal font-sans-serif text-primary mb-1 lh-1 mb-2">
                <h5>
                  <span className="fs-1 text-warning">Sunrise : </span>
                  <span className="text-primary">
                    {' '}
                    {sunRiseTime}
                    {/* {weather ? weather.sys.sunrise : ''} */}
                  </span>
                </h5>
                <h5>
                  <span className="fs-1 text-warning">Sunset : </span>
                  <span className="text-primary"> {sunSetTime}</span>
                </h5>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default WeatherDetails;
