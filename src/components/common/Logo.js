import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
// import logo from 'assets/img/illustrations/falcon.png';
import logo from 'assets/img/logos/elena/logo.png';
// import logo from 'assets/img/logos/elena/logo.png';

const Logo = ({ at, width, className, ...rest }) => {
  return (
    <Link
      to="/dashboard"
      className={classNames(
        'text-decoration-none',
        { 'navbar-brand text-left': at === 'navbar-vertical' },
        { 'navbar-brand text-left': at === 'navbar-top' }
      )}
      {...rest}
    >
      <div
        className={classNames(
          'd-flex',
          {
            'align-items-center py-3': at === 'navbar-vertical',
            'align-items-center': at === 'navbar-top',
            'flex-center fw-bolder fs-5 mb-4': at === 'auth'
          },
          className
        )}
      >
        <img className="logo-img" src={logo} alt="Logo" width={30} height={35}/>
        {/* <span className={classNames('font-sans-serif', textClass)}>falcon</span> */}
      </div>
    </Link>
  );
};

Logo.propTypes = {
  at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),
  width: PropTypes.number,
  className: PropTypes.string
  // textClass: PropTypes.string
};

Logo.defaultProps = { at: 'auth', width: 58 };

export default Logo;
