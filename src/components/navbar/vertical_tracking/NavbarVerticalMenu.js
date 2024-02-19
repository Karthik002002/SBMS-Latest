import classNames from 'classnames';
import AppContext from 'context/Context';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Collapse, Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import NavbarVerticalMenuItem from './NavbarVerticalMenuItem';
import { toast } from 'react-toastify';

const CollapseItems = ({ route }) => {
  const { pathname } = useLocation();

  const openCollapse = childrens => {
    const checkLink = children => {
      if (children.to === pathname) {
        return true;
      }
      return (
        Object.prototype.hasOwnProperty.call(children, 'vehicles') &&
        children.children.some(checkLink)
      );
    };
    return childrens.some(checkLink);
  };

  const [open, setOpen] = useState(openCollapse(route.vehicles));

  return (
    <Nav.Item as="li">
      <Nav.Link
        onClick={() => {
          setOpen(!open);
        }}
        className={classNames('dropdown-indicator cursor-pointer', {
          'text-500': !route.active
        })}
        aria-expanded={open}
        // {...route}
      >
        <NavbarVerticalMenuItem route={route} />
      </Nav.Link>
      <Collapse in={open}>
        <Nav className="flex-column nav" as="ul">
          <NavbarVerticalMenu
            routes={route.vehicles}
            // name={route.id + '_' + route.name}
            name={route.id}
          />
        </Nav>
      </Collapse>
    </Nav.Item>
  );
};

CollapseItems.propTypes = {
  route: PropTypes.shape({
    name: PropTypes.any.isRequired,
    id: PropTypes.number.isRequired,
    icon: PropTypes.string,
    vehicles: PropTypes.array.isRequired,
    active: PropTypes.bool
  }).isRequired
};

const NavbarVerticalMenu = ({ routes, name }) => {
  const {
    config: { showBurgerMenu },
    setConfig
  } = useContext(AppContext);

  const handleNavItemClick = () => {
    if (showBurgerMenu) {
      setConfig('showBurgerMenu', !showBurgerMenu);
    }
  };

  const handleSetVehicle = (route, name) => {
    if (route.imei) {
      setConfig('currentVehicle', {
        vehicle: route.imei,
        vrn: route.vehicle_reg_num,
        school: name
      });
      return;
    }
    toast.error('Vehicle not associated with a tracking device');
  };

  return routes.map(route => {
    if (!route.vehicles) {
      return (
        <Nav.Item as="li" key={route.imei} onClick={handleNavItemClick}>
          <NavLink
            // end={route.exact}
            // to={route.to}
            onClick={() => handleSetVehicle(route, name)}
            // state={{ open: route.to === '/authentication-modal' }}
            className={({ isActive }) =>
              isActive && route.to !== '#!' ? 'active nav-link' : 'nav-link'
            }
          >
            <NavbarVerticalMenuItem route={route} />
          </NavLink>
        </Nav.Item>
      );
    }
    return <CollapseItems route={route} key={route.name} />;
  });
};

NavbarVerticalMenu.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape(NavbarVerticalMenuItem.propTypes))
    .isRequired,
  name: PropTypes.any
};

export default NavbarVerticalMenu;
