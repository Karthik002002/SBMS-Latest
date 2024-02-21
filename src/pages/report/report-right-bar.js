import React from 'react';
import { NavLink } from 'react-router-dom';

const ReportBar = () => {
  return (
    <div className="report-bar">
      <div className="d-flex flex-column align-items-start ">
        {/* <NavLink to="/report/month" className="custom-dropdown-toggle mt-3" activeClassName="active-link">
          Monthly Report
        </NavLink>
        <NavLink to="/report/week" className="custom-dropdown-toggle" activeClassName="active-link">
          Weekly Report
        </NavLink> */}
        {/* <NavLink to="/report/daily" className="custom-dropdown-toggle" activeClassName="active-link">
          Daily Report
        </NavLink> */}
        <NavLink to="/report/KM-report" className="custom-dropdown-toggle mt-3" activeClassName="active-link">
          KM Tracking Report
        </NavLink>
        {/* <NavLink to="/report/lowbattery" className="custom-dropdown-toggle" activeClassName="active-link">
          Low Battery Report
        </NavLink> */}
        {/* <NavLink to="/report/unlit" className="custom-dropdown-toggle" activeClassName="active-link">
          UnLit Report
        </NavLink> */}
      </div>
    </div>
  );
};

export default ReportBar;
