import axios from 'axios';
import Divider from 'components/common/Divider';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import SocialAuthButtons from './SocialAuthButtons';

const LoginForm = ({ hasLabel }) => {
  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://192.168.0.30:8000/user/login/',
        {
          username: e.target[0].value,
          password: e.target[1].value,
          // client: 'smbs-webapp'
        }
      );
      window.sessionStorage.setItem(
        'loggedInUser',
        JSON.stringify(response.data)
      );

      toast.success(`Logged in as ${e.target[0].value}`, {
        theme: 'colored'
      });
      console.log(response.data);
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error('Login Error', { theme: 'colored' });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mt-4">
        {hasLabel && <Form.Label>Username</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Username' : ''}
          name="username"
          type="username"
          id="loginformusername"
        />
      </Form.Group>

      <Form.Group className="mb-4">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          name="password"
          type="password"
          id="loginformpassword"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input type="checkbox" name="remember" />
            <Form.Check.Label className="mb-0 text-700">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>

        {/* <Col xs="auto">
          <Link className="fs--1 mb-0" to={`/forgot-password`}>
            Forgot Password?
          </Link>
        </Col> */}
      </Row>

      <Form.Group>
        <Button type="submit" color="primary" className="mt-4 w-100">
          Log in
        </Button>
      </Form.Group>

      <Link to={`/contact-us`}>
        {/* <Divider className="mt-5">Contact Elena Geo Systems</Divider> */}
      </Link>

      {/* <SocialAuthButtons /> */}
    </Form>
  );
};

LoginForm.propTypes = {
  // layout: PropTypes.string,
  hasLabel: PropTypes.bool,
  props: PropTypes.object
};

LoginForm.defaultProps = {
  // layout: 'simple',
  hasLabel: false,
  props: {}
};

export default LoginForm;
