import React, { useEffect, useRef, useState } from 'react';
import { useListFilterContext } from 'context/FilterContext';

import { NavLink } from 'react-router-dom';

const ReportBar = () => {
  const [mobNavBar, setMobNavBar] = useState(false);
  const { IMEI, setIMEI } = useListFilterContext();
  // useEffect(() => {
  //   if (IMEI !== null) {
  //     socket.send(`stop:${IMEI}`);
  //     setIMEI(null);
  //   }
  // }, []);

  return (
    <div className={` ${mobNavBar ? 'report-bar active' : 'report-bar'}`}>
      {/* <div>
        {mobNavBar ? (
          <div className="d-flex" style={{ width: 'max-content' }}>
          <BiSolidReport
            size={18}
            onClick={() => setMobNavBar(false)}
            className="track-burgermenu"
          />
          <MdArrowBackIos 
            onClick={() => setMobNavBar(false)}
            className="track-burgermenu-arrow"
          />
        </div>
        ) : (
          <div className="d-flex" style={{ width: 'max-content' }}>
            <BiSolidReport
              size={18}
              onClick={() => setMobNavBar(true)}
              className="track-burgermenu"
            />
            <MdArrowForwardIos 
              onClick={() => setMobNavBar(true)}
              className="track-burgermenu-arrow"
            />
          </div>
        )}

      </div> */}
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
          to="/report/idle"
          className={`custom-dropdown-toggle`}
          activeClassName="active-link"
        >
          Idle Report
        </NavLink>
        <NavLink
          to="/report/overspeed"
          className={`custom-dropdown-toggle`}
          activeClassName="active-link"
        >
          OverSpeed Report
        </NavLink>
        <NavLink
          to="/report/stopped"
          className={`custom-dropdown-toggle`}
          activeClassName="active-link"
        >
          Stopped Report
        </NavLink>
        <NavLink
          to="/report/history-tracking"
          className={`custom-dropdown-toggle`}
          activeClassName="active-link"
        >
          History Tracking Report
        </NavLink>
      </div>
    </div>
  );
};

export default ReportBar;
