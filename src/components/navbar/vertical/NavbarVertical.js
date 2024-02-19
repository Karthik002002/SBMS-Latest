import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Nav, Navbar, Row, Col } from 'react-bootstrap';
import { navbarBreakPoint, topNavbarBreakpoint } from 'config';
import AppContext from 'context/Context';
import Flex from 'components/common/Flex';
import Logo from 'components/common/Logo';
import NavbarVerticalMenu from './NavbarVerticalMenu';
// import ToggleButton from './ToggleButton';
// import routes from 'routes/siteMaps';
import { capitalize } from 'helpers/utils';
import NavbarTopDropDownMenus from 'components/navbar/top/NavbarTopDropDownMenus';
import PurchaseCard from './PurchaseCard';
import bgNavbar from 'assets/img/generic/bg-navbar.png';
import IconButton from 'components/common/IconButton';
import { Link } from 'react-router-dom';

const NavbarVertical = ({ data, setCenter, setZoomLevel }) => {
  console.log(data);
  let zone = new Set();

  let goku = [];
  let gokha = [];
  data.forEach(buoy => {
    zone.add(buoy.zone);
    if (buoy.zone === [...zone][0]) {
      goku.push(buoy.buoy_id);
    } else {
      gokha.push(buoy.buoy_id);
    }
  });
  console.log(goku);
  console.log(gokha);

  const gokuData = goku.map(name => (
    <>
      {name}
      <br />
    </>
  ));
  const gokhaData = gokha.map(name => (
    <>
      {name}
      <br />
    </>
  ));

  const recentBuoysData = [];

  const buoysData = {
    label: 'Dashboard',
    labelDisable: true,
    children: [
      {
        name: 'GOKU',
        active: true,
        // icon: 'chart-pie',
        children: [
          {
            name: gokuData,
            to: '/monitoring',
            exact: true,
            active: false
          }
        ]
      },
      {
        name: 'GOKHA',
        active: true,
        // icon: 'chart-pie',
        children: [
          {
            name: gokhaData,
            // to: '/',
            exact: true,
            active: false
          }
        ]
      }
    ]
  };

  recentBuoysData.push(buoysData);

  const {
    config: {
      navbarPosition,
      navbarStyle,
      isNavbarVerticalCollapsed,
      showBurgerMenu
    }
  } = useContext(AppContext);

  const HTMLClassList = document.getElementsByTagName('html')[0].classList;

  useEffect(() => {
    if (isNavbarVerticalCollapsed) {
      HTMLClassList.add('navbar-vertical-collapsed');
    } else {
      HTMLClassList.remove('navbar-vertical-collapsed');
    }
    return () => {
      HTMLClassList.remove('navbar-vertical-collapsed-hover');
    };
  }, [isNavbarVerticalCollapsed, HTMLClassList]);

  //Control mouseEnter event
  let time = null;
  const handleMouseEnter = () => {
    if (isNavbarVerticalCollapsed) {
      time = setTimeout(() => {
        HTMLClassList.add('navbar-vertical-collapsed-hover');
      }, 100);
    }
  };
  const handleMouseLeave = () => {
    clearTimeout(time);
    HTMLClassList.remove('navbar-vertical-collapsed-hover');
  };

  const NavbarLabel = ({ label }) => (
    <Nav.Item as="li">
      <Row className="mt-3 mb-2 navbar-vertical-label-wrapper">
        <Col xs="auto" className="navbar-vertical-label navbar-vertical-label">
          {label}
        </Col>
        <Col className="ps-0">
          <hr className="mb-0 navbar-vertical-divider"></hr>
        </Col>
      </Row>
    </Nav.Item>
  );

  return (
    <div className="mt-5">
      <Navbar
        expand={navbarBreakPoint}
        className={classNames('navbar-vertical', {
          [`navbar-${navbarStyle}`]: navbarStyle !== 'transparent'
        })}
        variant="light"
      >
        {/* <Flex alignItems="center">
        <ToggleButton />
        <Logo at="navbar-vertical" width={40} />
      </Flex> */}
        <Navbar.Collapse
          in={showBurgerMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundImage:
              navbarStyle === 'vibrant'
                ? `linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2),url(${bgNavbar})`
                : 'none'
          }}
        >
          <div className="navbar-vertical-content scrollbar">
            <Nav className="flex-column" as="ul">
              {recentBuoysData.map(route => (
                <Fragment key={route.label}>
                  {!route.labelDisable && (
                    <NavbarLabel label={capitalize(route.label)} />
                  )}
                  <NavbarVerticalMenu routes={route.children} />
                </Fragment>
              ))}
            </Nav>

            <>
              {navbarPosition === 'combo' && (
                <div className={`d-${topNavbarBreakpoint}-none`}>
                  <div className="navbar-vertical-divider">
                    <hr className="navbar-vertical-hr my-2" />
                  </div>
                  <Nav navbar>{/* <NavbarTopDropDownMenus /> */}</Nav>
                </div>
              )}
              {/* <PurchaseCard /> */}
            </>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

NavbarVertical.propTypes = {
  label: PropTypes.string
};

export default NavbarVertical;
