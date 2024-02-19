import React from 'react';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
// import SoftBadge from 'components/common/SoftBadge';

const NavbarVerticalMenuItem = ({ route }) => {
  return (
    <Flex alignItems="center">
      {/* {route.icon && (
        <span className="nav-link-icon">
          <FontAwesomeIcon icon={route.icon} />
        </span>
      )} */}
      <span className="nav-link-text ps-1">
        <input type="checkbox" className="mx-1" />
        {route.name || route.vehicle_reg_num || 'Undefined'}
      </span>
      {/* {route.badge && (
        <SoftBadge pill bg={route.badge.type} className="ms-2">
          {route.badge.text}
        </SoftBadge>
      )} */}
    </Flex>
  );
};

// prop-types
const routeShape = {
  active: PropTypes.bool,
  name: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};
routeShape.children = PropTypes.arrayOf(PropTypes.shape(routeShape));
NavbarVerticalMenuItem.propTypes = {
  route: PropTypes.shape(routeShape).isRequired
};

export default React.memo(NavbarVerticalMenuItem);
