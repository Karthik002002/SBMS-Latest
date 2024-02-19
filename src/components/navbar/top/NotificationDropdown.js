import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import {
  rawEarlierNotifications,
  rawNewNotifications
} from 'data/notification/notification';
import { isIterableArray } from 'helpers/utils';
import useFakeFetch from 'hooks/useFakeFetch';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Notification from 'components/notification/Notification';
import { toast } from 'react-toastify';
import axios from 'axios';

const NotificationDropdown = () => {
  // State
  // const { data: newNotifications, setData: setNewNotifications } =
  //   useFakeFetch(rawNewNotifications);
  // const { data: earlierNotifications, setData: setEarlierNotifications } =
  //   useFakeFetch(rawEarlierNotifications);
  const [NewNotification, setNewNotification] = useState([]);
  const [NewNotificationList, setNewNotificationList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [NotificationCount, setNotificationCount] = useState('');
  const [isAllRead, setIsAllRead] = useState(true);
  const [AllViewActive, setAllViewActive] = useState(false);
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  const NotificationURL =
    'https://bmsadmin.elenageosys.com/notification/get_alerts/';

  const fetchData = async () => {
    try {
      const [Notificationresponse] = await Promise.all([
        fetch(NotificationURL, {
          method: 'GET',
          headers: { Authorization: `token ${userToken.token}` }
        })
      ]);

      const [data] = await Promise.all([Notificationresponse.json()]);
      const getTimeDifference = timestamp => {
        const currentDate = new Date();
        const messageDate = new Date(timestamp);
        return Math.abs(currentDate - messageDate);
      };

      const sortedData = data.sort((a, b) => {
        const timeDifferenceA = getTimeDifference(a.timestamp);
        const timeDifferenceB = getTimeDifference(b.timestamp);
        return timeDifferenceA - timeDifferenceB;
      });
      if (sortedData.length === 0) {
        setIsAllRead(true);
        setNotificationCount('');
      } else {
        setIsAllRead(false);
        setNotificationCount(sortedData.length);
      }
      setNewNotification(sortedData);
    } catch (error) {
      setNotificationCount('');
      setIsAllRead(true);
      console.error(error);
    }
  };

  const getTimeAgo = timestamp => {
    const currentDate = new Date();
    const messageDate = new Date(timestamp);
    const timeDifference = Math.floor((currentDate - messageDate) / 1000); // Convert to seconds

    const days = Math.floor(timeDifference / (60 * 60 * 24));
    const hours = Math.floor(timeDifference / (60 * 60));
    const minutes = Math.floor(timeDifference / 60);
    const seconds = timeDifference;

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };
  //View Handler
  const handleToggle = e => {
    setIsOpen(!isOpen);
  };

  const handleAllview = () => {
    setAllViewActive(!AllViewActive);
  };

  useEffect(() => {
    // fetchData();
    // Call every 10 seconds for getting latest Notification from the server
    // const intervalId = setInterval(fetchData, 10000);
    // return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Update time ago for each notification every second
    const intervalId = setInterval(() => {
      const updatedNotificationList = NewNotification.map(notification => {
        const timeAgo = getTimeAgo(notification.timestamp);
        return { ...notification, timeAgo };
      });
      setNewNotificationList(updatedNotificationList);
    }, 1000);

    //Clear the Interval function when the component unmounts
    return () => clearInterval(intervalId);
  }, [NewNotification]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.innerWidth < 1200 && setIsOpen(false);
    });
  }, []);

  const handleMarkAsAllRead = () => {
    const MarkAllreadID = NewNotification?.map(notification => notification.id);
    const markAllreadForm = { notification_id: MarkAllreadID };
    const MarkAllread = async () => {
      try {
        const notificationURL =
          'https://bmsadmin.elenageosys.com/notification/mark_all_seen/';
        const notificationResponse = await axios.put(
          notificationURL,
          markAllreadForm,
          {
            headers: { Authorization: `token ${userToken.token}` }
          }
        );
        if (notificationResponse.status === 200) {
          setIsAllRead(true);
          fetchData();
        }
      } catch (error) {
        console.error('Error on the Mark AllRead', error);
      }
    };
    MarkAllread();
  };

  return (
    <Dropdown
      navbar={true}
      as="li"
      show={isOpen}
      onToggle={handleToggle}
      className=""
    >
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        className={classNames('px-0 nav-link', {
          'notification-indicator notification-indicator-danger': !isAllRead
        })}
      >
        <div className="d-flex">
          <FontAwesomeIcon
            icon="bell"
            transform="shrink-6"
            className="fs-4 text-white"
          />
          <div
            className={
              NotificationCount <= 5
                ? `notification-indicator-count`
                : NotificationCount < 10
                ? `notification-indicator-count-5-9`
                : NotificationCount === 10
                ? 'notification-indicator-count-10'
                : `notification-indictor-count-10plus`
            }
          >
            {NotificationCount <= 10 ? NotificationCount : '10+'}
          </div>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-card dropdown-menu-end dropdown-caret dropdown-caret-bg">
        <Card
          className="dropdown-menu-notification dropdown-menu-end shadow-none"
          style={{ maxWidth: '20rem' }}
        >
          <FalconCardHeader
            className="card-header notification-header-text"
            title="Notifications"
            titleTag="h6"
            light={false}
            endEl={
              <div
                className={`card-link fw-normal link markas-read-btn cursor-pointer ${
                  isAllRead ? 'd-none' : ''
                }`}
                onClick={handleMarkAsAllRead}
              >
                Mark all as read
              </div>
            }
          />
          {NewNotification.length !== 0 ? (
            <ListGroup
              variant="flush"
              className="fw-normal fs--1 scrollbar"
              style={
                AllViewActive ? { maxHeight: '80vh' } : { maxHeight: '28vh' }
              }
            >
              <div className="list-group-title">NEW</div>{' '}
              {NewNotificationList.map(notification => (
                <ListGroup.Item key={notification.id}>
                  <Notification
                    notification={notification}
                    flush
                    MarkAsRead={fetchData}
                  />
                </ListGroup.Item>
              ))}
              {/* <div className="list-group-title">EARLIER</div> */}
              {/* {isIterableArray(earlierNotifications) &&
              earlierNotifications.map(notification => (
                <ListGroup.Item key={notification.id} onClick={handleToggle}>
                  <Notification {...notification} flush />
                </ListGroup.Item>
              ))} */}
            </ListGroup>
          ) : (
            <div className="empty-notification-div">No New Notification</div>
          )}
          {NewNotification.length !== 0 ? (
            <div
              className="card-footer text-center border-top"
              onClick={handleAllview}
            >
              <Link className="card-link d-block">
                {AllViewActive ? 'Close' : 'View all'}
              </Link>
            </div>
          ) : (
            <></>
          )}
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;

// const markAsRead = e => {
//   e.preventDefault();

//   const updatedNewNotifications = NewNotification.map(notification =>
//     Object.prototype.hasOwnProperty.call(notification, 'unread')
//       ? { ...notification, unread: false }
//       : notification
//   );
//   const updatedEarlierNotifications = earlierNotifications.map(notification =>
//     Object.prototype.hasOwnProperty.call(notification, 'unread')
//       ? { ...notification, unread: false }
//       : notification
//   );
//   setIsAllRead(true);
//   setNewNotifications(updatedNewNotifications);
//   setEarlierNotifications(updatedEarlierNotifications);
// };
