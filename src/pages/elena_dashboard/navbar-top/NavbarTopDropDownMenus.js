// import React, { useContext } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
// import AppContext from 'context/Context';

const NavbarTopDropDownMenus = () => {
  // const {
  //   config: { navbarCollapsed, showBurgerMenu },
  //   setConfig
  // } = useContext(AppContext);

  // const handleDropdownItemClick = () => {
  //   if (navbarCollapsed) {
  //     setConfig('navbarCollapsed', !navbarCollapsed);
  //   }
  //   if (showBurgerMenu) {
  //     setConfig('showBurgerMenu', !showBurgerMenu);
  //   }
  // };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" to="/vehicledashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/trackingpage">
          Track Page
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#">
          Report Generation{' '}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#">
          Resource Management{' '}
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Login/Sign Up{' '}
        </Link>
      </li>
    </ul>
  );
};

export default NavbarTopDropDownMenus;
