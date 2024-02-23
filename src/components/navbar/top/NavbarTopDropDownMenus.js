// import React, { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import AppContext from 'context/Context';

const NavbarTopDropDownMenus = ({ handleMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = location.pathname.startsWith('/report/');
  const HandleClose = () => {
    handleMenu();
  };
  return (
    <>
      <div className={`mob-navbar ${isOpen ? 'open' : ''}`} id="mobile-nav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
          <li className="nav-item" onClick={HandleClose}>
            <NavLink
              to="/dashboard"
              className="navbar-hamburger-dashboard"
              // style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              Dashboard
            </NavLink>{' '}
          </li>

          <li onClick={HandleClose}>
            <NavLink
              to="/tracking"
              className="navbar-hamburger-dashboard"
              activeClassName="mobile-navbar-active"
              // style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              Tracking
            </NavLink>{' '}
          </li>

          <li onClick={HandleClose}>
            <NavLink
              to="/report/KM-report"
              className={`navbar-hamburger-dashboard mobile-navbar ${
                isActive ? 'active' : ''
              }`}
              // style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              Report
            </NavLink>
          </li>
          <li onClick={HandleClose}>
            <a
              href="https://sbmsadmin.elenageosys.com/admin/"
              target="_blank"
              className="text-decoration-underline"
            >
              Admin
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarTopDropDownMenus;
