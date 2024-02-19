// import React, { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import AppContext from 'context/Context';

const NavbarTopDropDownMenus = ({ setOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = location.pathname.startsWith('/report/');
  const closeSidebar = () => {
    // setIsOpen(!isOpen);
    // console.log('Handle Close ');
    setOpen();
  };
  // useEffect(() => {
  //   const handleClickOutside = event => {
  //     const divElement = document.getElementById('mobile-nav'); // Replace 'your-div-id' with the actual ID of your div
  //     if (divElement && !divElement.contains(event.target)) {
  //       console.log('Click outside');
  //       // Add logic here to close the div
  //     }
  //   };

  //   // Add event listener to handle clicks outside of the div
  //   document.body.addEventListener('click', handleClickOutside);

  //   // Cleanup function to remove the event listener when the component unmounts
  //   return () => {
  //     document.body.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);
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
    <>
      <div className={`mob-navbar ${isOpen ? 'open' : ''}`} id="mobile-nav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
          <li className="nav-item" onClick={closeSidebar}>
            <NavLink
              to="/dashboard"
              className="navbar-hamburger-dashboard"
              // style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              Dashboard
            </NavLink>{' '}
          </li>

          <li onClick={closeSidebar}>
            <NavLink
              to="/monitoring"
              className="navbar-hamburger-dashboard"
              activeClassName="mobile-navbar-active"
              // style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              Monitoring
            </NavLink>{' '}
          </li>

          <li onClick={closeSidebar}>
            <NavLink
              to="/report/month"
              className={`navbar-hamburger-dashboard mobile-navbar ${
                isActive ? 'active' : ''
              }`}
              // style={{ fontSize: '16px', textDecoration: 'none' }}
            >
              Report
            </NavLink>
          </li>
          <li>
            <a
              href="https://bmsadmin.elenageosys.com/admin/"
              target="_blank"
              className="text-decoration-underline"
            >
              Admin
            </a>
          </li>
        </ul>
      </div>
    </>
    // <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    //   <li className="nav-item">
    //     <Link className="nav-link" to="/dashboard">
    //       Dashboard
    //     </Link>
    //   </li>
    //   <li className="nav-item">
    //     <Link className="nav-link" to="/bus-tracking">
    //       Track Your Vehicles
    //     </Link>
    //   </li>
    //   <li className="nav-item">
    //     <Link className="nav-link" to="#">
    //       Report Generation{' '}
    //     </Link>
    //   </li>
    //   <li className="nav-item">
    //     <Link className="nav-link" to="#">
    //       Resource Management{' '}
    //     </Link>
    //   </li>
    //   <li className="nav-item">
    //     <Link className="nav-link" to="/">
    //       Login/Sign Up{' '}
    //     </Link>
    //   </li>
    // </ul>
  );
};

export default NavbarTopDropDownMenus;
