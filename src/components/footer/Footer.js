import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
// import { version } from 'config';

const Footer = () => {



  return(
  <div>
    <footer className="footer">
      <Row className="justify-content-between text-center fs--1 ms-1 mb-3">
        <Col sm="auto">
          <p className="mb-0 text-600">
            School Bus Management System{' '}
            <span className="d-none d-sm-inline-block">| </span>
            <br className="d-sm-none" /> {new Date().getFullYear()} &copy;{' '}
            <a href="https://elenageosys.com" target='blank'>Elena</a>
            {/* <span className="d-none d-sm-inline-block">| </span>
          Designed by <a href="https://www.studetails.com">StuDetails</a> */}
          </p>
        </Col>
        {/* <Col sm="auto">
        <p className="mb-0 text-600">v{version}</p>
      </Col> */}
      </Row>
    </footer>
  </div>
  )
};

export default Footer;
