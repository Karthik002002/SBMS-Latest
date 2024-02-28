// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import team3 from 'assets/img/team/avatar.png';
import Avatar from 'components/common/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CiLogout } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';

const ProfileDropdown = () => {
  const mainURL = 'https://sbmsadmin.elenageosys.com/user/logout/';
  var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  const handleLogout = async () => {
    try {
      const response = await fetch(mainURL, {
        method: 'POST',
        headers: {
          Authorization: `token ${loggedInUser.token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      sessionStorage.removeItem('loggedInUser');
      window.location.href = '/logout';
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return;
    }
  };
  return (
    <Dropdown navbar={true} as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="#"
        className="pe-0 nav-link mt-1"
      >
        <FontAwesomeIcon
          icon="user"
          className="text-primary profile-icon-navbar-svg fa-w-16 fs-0"
        />
        {/* <FontAwesomeIcon icon="fa-solid fa-sun" /> */}
        {/* <Avatar src={team3} /> */}
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card  dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <div className="profile-dropdown-container">
            <FaUser className="fs-0 me-1" />
            <h4 className="profile-dropdown-name">{loggedInUser.username}</h4>
          </div>
          <Dropdown.Item as={Link} onClick={handleLogout} className="profile-list-items">
            <CiLogout className="me-1" />
            Logout
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
