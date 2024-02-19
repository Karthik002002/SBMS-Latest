import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import AppContext from 'context/Context';
import DateTime from 'pages/elena_dashboard/DateTime';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { usePingButton } from 'context/PingContext';
import NotificationDropdown from './NotificationDropdown';

const TopNavRightSideNavItem = () => {
  const {
    config: { isDark, isRTL },
    setConfig
  } = useContext(AppContext);
  const { Ping, setPing } = usePingButton();
  return (
    <Nav
      navbar
      className="navbar-nav-icons ms-auto flex-row align-items-center pe-2"
      as="ul"
    >
      <Button
        variant=""
        className={`btn me-3 ping-btn ${isDark ? '' : ''} weather-value`}
        onClick={() => setPing(Ping + 1)}
      >
        Ping
      </Button>
      <DateTime />
      <Nav.Item as={'li'}>
        <Nav.Link className="px-2 pe-1 theme-control-toggle">
          <div className="d-flex">
            <OverlayTrigger
              key="left"
              placement={isRTL ? 'bottom' : 'left'}
              overlay={
                <Tooltip style={{ position: 'fixed' }} id="ThemeColor">
                  {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                </Tooltip>
              }
            >
              {/* <div className="d-flex"> */}
              <div
                className="theme-control-toggle-label me-2 pt-1"
                onClick={() => setConfig('isDark', !isDark)}
              >
                <div className="">
                  <FontAwesomeIcon
                    icon={isDark ? 'sun' : 'moon'}
                    className="fs-0"
                  />
                </div>
              </div>
            </OverlayTrigger>
            <div className="profile-icon profile-icon-navbar theme-control-toggle-label pe-2">
              <div>
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </Nav.Link>
      </Nav.Item>
      <div>
        <NotificationDropdown />
      </div>
    </Nav>
  );
};

export default TopNavRightSideNavItem;
