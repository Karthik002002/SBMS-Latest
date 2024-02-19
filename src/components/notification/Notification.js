import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import createMarkup from 'helpers/createMarkup';
import Avatar from 'components/common/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleUp,
  faBatteryHalf,
  faLightbulb,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Notification = ({ notification, flush, MarkAsRead }) => {
  const { id, seen, alert_message, alert_type, timeAgo } = notification;
  // const [timeAgo, setTimeAgo] = useState('');
  const userToken = JSON.parse(window.sessionStorage.getItem('loggedInUser'));

  const markAsRead = data => {
    const markAllreadForm = { notification_id: [data] };
    const MarkAsreadCall = async () => {
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
          MarkAsRead();
        }
      } catch (error) {
        console.error('Error on the Mark AllRead', error);
      }
    };
    MarkAsreadCall();
  };

  return (
    <div
      className={classNames('notification', {
        'notification-unread': seen,
        'notification-flush': flush
      })}
    >
      <div className="notification-body">
        <div className="d-flex">
          <div className="notification-message-body-icon">
            <FontAwesomeIcon
              icon={
                alert_type === 1
                  ? faMinusCircle
                  : alert_type === 2
                  ? faLightbulb
                  : alert_type === 3
                  ? faBatteryHalf
                  : faArrowCircleUp
              }
              className="mt-1 me-1"
            />
          </div>
          <p
            className="mb-1  notification-message-content"
            dangerouslySetInnerHTML={createMarkup(alert_message)}
          />
        </div>
        <div className="notification-container">
          <span className="notification-time time-notification-read">
            {timeAgo}
          </span>
          <div
            className="markas-read-btn cursor-pointer"
            onClick={() => markAsRead(id)}
          >
            Mark as Read
          </div>
        </div>
      </div>
    </div>
  );
};

Notification.propTypes = {
  avatar: PropTypes.shape(Avatar.propTypes),
  time: PropTypes.string.isRequired,
  className: PropTypes.string,
  seen: PropTypes.bool,
  flush: PropTypes.bool,
  emoji: PropTypes.string,
  children: PropTypes.node
};

// Notification.defaultProps = { unread: false, flush: false };

export default Notification;

{
  /* {avatar && (
      <div className="notification-avatar">
        <Avatar {...avatar} className="me-3" />
      </div>
    )} */
}

// const getTimeAgo = timestamp => {
//   const currentDate = new Date();
//   const messageDate = new Date(timestamp);
//   const timeDifference = Math.floor((currentDate - messageDate) / 1000); // Convert to seconds

//   const days = Math.floor(timeDifference / (60 * 60 * 24));
//   const hours = Math.floor(timeDifference / (60 * 60));
//   const minutes = Math.floor(timeDifference / 60);
//   const seconds = timeDifference;

//   if (days > 0) {
//     return `${days} day${days > 1 ? 's' : ''} ago`;
//   } else if (hours > 0) {
//     return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//   } else if (minutes > 0) {
//     return `${minutes}m ago`;
//   } else {
//     return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
//   }
// };
