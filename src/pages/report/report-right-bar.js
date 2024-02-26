import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline
} from 'react-icons/io5';

import { NavLink } from 'react-router-dom';

const ReportBar = () => {
  const [mobNavBar, setMobNavBar] = useState(false);

  return (
    <div className={` ${mobNavBar ? 'report-bar active' : 'report-bar'}`}>
      <div>
        {mobNavBar ? (
          <IoArrowBackCircleOutline
            size={18}
            onClick={() => setMobNavBar(false)}
            className="track-burgermenu-active"
          />
        ) : (
          <IoArrowForwardCircleOutline
            size={18}
            onClick={() => setMobNavBar(true)}
            className="track-burgermenu"
          />
        )}

        {}
      </div>
      <div
        className={`${
          mobNavBar ? 'mob-inactive-navbar-active' : 'mob-inactive-navbar'
        }`}
      >
        <NavLink
          to="/report/KM-report"
          className={`custom-dropdown-toggle mt-3`}
          activeClassName="active-link"
        >
          KM Tracking Report
        </NavLink>
        <NavLink
          to="/report/Idle"
          className={`custom-dropdown-toggle`}
          activeClassName="active-link"
        >
          Idle Report
        </NavLink>
      </div>
    </div>
  );
};

export default ReportBar;
