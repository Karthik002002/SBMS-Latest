import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import Background from 'components/common/Background';
import Flex from 'components/common/Flex';
import Section from 'components/common/Section';

import bgShape from 'assets/img/illustrations/bg-shape.png';
import shape1 from 'assets/img/illustrations/shape-1.png';
import halfCircle from 'assets/img/illustrations/half-circle.png';

import logo from 'assets/img/logos/elena/logo.png';

const AuthCardLayout = ({ leftSideContent, children, footer = true }) => {
  return (
    <Section fluid className="py-0">
      <Row className="g-0 min-vh-100 flex-center">
        <Col lg={8} xxl={5} className="py-3 position-relative">
          <img
            className="bg-auth-circle-shape"
            src={bgShape}
            alt=""
            width="250"
          />
          <img
            className="bg-auth-circle-shape-2"
            src={shape1}
            alt=""
            width="150"
          />
          <Card className="overflow-hidden z-index-1">
            <Card.Body className="p-0">
              <Row className="h-100 g-0">
                <Col md={5} className="text-white text-center bg-card-gradient">
                  <div className="position-relative p-4 pt-md-5 pb-md-7">
                    <Background
                      image={halfCircle}
                      className="bg-auth-card-shape"
                    />
                    <div className="z-index-1 position-relative light">
                      <img
                        src={logo}
                        alt="Elena Logo"
                        // width={400}
                        height={220}
                        className="me-2 mb-3 px-3 rounded-4 mobile-logo bg-white pb-2"
                      />
                      <Link className="link-light mb-4 font-sans-serif fw-bolder fs-4 d-inline-block">
                        School Bus Management System
                      </Link>
                      {/* <p className="opacity-75 text-white">
                        With the Power of Elena Geo Systems and NavIC we are
                        able to provide you the ability to monitor your Buoys
                      </p> */}
                    </div>
                  </div>
                  <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                    {leftSideContent}

                    {footer && (
                      <p className="mb-0 mt-4 mt-md-5 fs--1 fw-semi-bold text-white opacity-75">
                        Powered by{' '}
                        <Link
                          className="text-decoration-underline text-white"
                          to="https://elenageosys.com/"
                          target="_blank"
                        >
                          Elena{' '}
                        </Link>{' '}
                        {/* and{' '}
                        <Link
                          className="text-decoration-underline text-white"
                          to="/privacy-policy"
                        >
                          Privacy Policy{' '}
                        </Link> */}
                      </p>
                    )}
                  </div>
                </Col>
                <Col
                  md={7}
                  as={Flex}
                  alignItems="center"
                  justifyContent="center"
                >
                  <div className="p-4 p-md-5 flex-grow-1">{children}</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Section>
  );
};
AuthCardLayout.propTypes = {
  leftSideContent: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.bool
};

export default AuthCardLayout;
