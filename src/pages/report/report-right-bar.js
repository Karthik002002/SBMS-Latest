import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ReportBar = () => {
  const [mobNavBar, setMobNavBar] = useState(false);
  return (
    <div className={` ${mobNavBar ? 'report-bar active' : 'report-bar'}`}>
      <div >
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setMobNavBar(!mobNavBar)}
          className={`${mobNavBar ? 'track-burgermenu-active': 'track-burgermenu'}`}
        />
        {}
      </div>
      <div className={`${mobNavBar ? 'mob-inactive-navbar-active' : 'mob-inactive-navbar'}`}>
        <NavLink
          to="/report/KM-report"
          className={`custom-dropdown-toggle mt-3`}
          activeClassName="active-link"
        >
          KM Tracking Report
        </NavLink>
        <NavLink
          to="/report/KM-repor"
          className={`custom-dropdown-toggle mt-3`}
          activeClassName="active-link"
        >
          Idle Report
        </NavLink>
      </div>
    </div>
  );
};

export default ReportBar;
