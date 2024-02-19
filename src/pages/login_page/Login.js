import React from 'react';
// import { Link } from 'react-router-dom';
import LoginForm from 'components/authentication/LoginForm';

import AuthCardLayout from 'layouts/AuthCardLayout';

const Login = props => {
  return (
    <AuthCardLayout>
      <h3 className="login-h3">Login</h3>
      <LoginForm layout="card" hasLabel props={props} />
    </AuthCardLayout>
  );
};

export default Login;
