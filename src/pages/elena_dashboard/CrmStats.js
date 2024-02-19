import { faCar } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import Flex from 'components/common/Flex';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { statsData } from './crm';
import classNames from 'classnames';
import IconItem from 'components/common/icon/IconItem';
// import StatsChart from './StatsChart';
// import { getColor } from 'helpers/utils';

// const StatsItem = ({ stat }) => {
//   // const { icon, color, title, amount, caret, caretColor, target, data } = stat;
//   const { icon, color, title, amount, data } = stat;
//   return (
//     <>
//       <Flex
//         justifyContent="center"
//         alignItems="center"
//         className="mb-3 position-static"
//       >
//         <IconItem
//           tag="div"
//           icon={icon}
//           bg={`soft-${color}`}
//           color={color}
//           size="sm"
//           iconClass="fs--2"
//           className="me-2 shadow-none"
//         />
//         <h6 className="mb-0 flex-1">{title}</h6>
//       </Flex>
//       <p className="font-sans-serif lh-1 mb-1 fs-4 pe-2">{amount}</p>
//       {/* <Row>
//         <Col md={4}>
//           <p className="font-sans-serif lh-1 mb-1 fs-4 pe-2">{amount}</p>
//         </Col>
//         <Col md={8}>
//           <div className="w-100 ms-2">
//             <StatsChart color={getColor(color)} data={data} />
//           </div>
//         </Col>
//       </Row> */}
//     </>
//   );
// };

const CrmStats = () => {
  const [stats, setStats] = useState({
    newusers: {
      title: 'New Users',
      amount: 0,
      icon: 'users',
      color: 'primary'
    },
    activevehicles: {
      title: 'Active Vehicles',
      amount: 0,
      icon: faCar,
      color: 'info'
    },
    Inactivevehicles: {
      title: 'Inactive Vehicles',
      amount: 0,
      icon: faCar,
      color: 'danger'
    }
  });
  useEffect(() => {
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    var activeVehicles = 0;
    var totalVehicles = 0;
    var newUsers = 0;
    loggedInUser.user.companies.map(company => {
      if ((Date.now() - new Date(company.user.date_joined)) / 3600000 < 30)
        newUsers++;
      company.schools.map(school => {
        if ((Date.now() - new Date(school.user.date_joined)) / 3600000 < 30)
          newUsers++;
        school.parents.map(parent => {
          if ((Date.now() - new Date(parent.user.date_joined)) / 3600000 < 30)
            newUsers++;
        });
        totalVehicles = totalVehicles + school.vehicles.length;
        school.vehicles.map(vehicle => {
          if (
            vehicle.device &&
            vehicle.device.record &&
            vehicle.device.record.ignition === true
          )
            activeVehicles++;
        });
      });
    });

    setStats({
      newusers: {
        title: 'New Users',
        amount: newUsers,
        icon: 'users',
        color: 'primary'
      },
      activevehicles: {
        title: 'Active Vehicles',
        amount: activeVehicles,
        icon: faCar,
        color: 'info'
      },
      Inactivevehicles: {
        title: 'Inactive Vehicles',
        amount: totalVehicles - activeVehicles,
        icon: faCar,
        color: 'danger'
      }
    });
  }, []);

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col lg={4} className={classNames('pb-3 pb-lg-0')}>
            <Flex
              justifyContent="center"
              alignItems="center"
              className="mb-3 position-static"
            >
              <IconItem
                tag="div"
                icon={stats.newusers.icon}
                bg={`soft-${stats.newusers.color}`}
                color={stats.newusers.color}
                size="sm"
                iconClass="fs--2"
                className="me-2 shadow-none"
              />
              <h6 className="mb-0 flex-1">{stats.newusers.title}</h6>
            </Flex>
            <p className="font-sans-serif lh-1 mb-1 fs-4 pe-2">
              {stats.newusers.amount}
            </p>
          </Col>

          <Col lg={4} className={classNames('py-3 py-lg-0')}>
            <Flex
              justifyContent="center"
              alignItems="center"
              className="mb-3 position-static"
            >
              <IconItem
                tag="div"
                icon={stats.activevehicles.icon}
                bg={`soft-${stats.activevehicles.color}`}
                color={stats.activevehicles.color}
                size="sm"
                iconClass="fs--2"
                className="me-2 shadow-none"
              />
              <h6 className="mb-0 flex-1">{stats.activevehicles.title}</h6>
            </Flex>
            <p className="font-sans-serif lh-1 mb-1 fs-4 pe-2">
              {stats.activevehicles.amount}
            </p>
          </Col>

          <Col
            lg={4}
            className={classNames(
              'border-bottom border-lg-0 border-lg-end',
              'pt-3 pt-lg-0'
            )}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              className="mb-3 position-static"
            >
              <IconItem
                tag="div"
                icon={stats.Inactivevehicles.icon}
                bg={`soft-${stats.Inactivevehicles.color}`}
                color={stats.Inactivevehicles.color}
                size="sm"
                iconClass="fs--2"
                className="me-2 shadow-none"
              />
              <h6 className="mb-0 flex-1">{stats.Inactivevehicles.title}</h6>
            </Flex>
            <p className="font-sans-serif lh-1 mb-1 fs-4 pe-2">
              {stats.Inactivevehicles.amount}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// StatsItem.propTypes = {
//   stat: PropTypes.shape({
//     amount: PropTypes.number.isRequired,
//     caret: PropTypes.string.isRequired,
//     caretColor: PropTypes.string.isRequired,
//     color: PropTypes.string.isRequired,
//     data: PropTypes.array.isRequired,
//     icon: PropTypes.string.isRequired,
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     target: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired
//   })
// };

// CrmStats.propTypes = {
//   stats: PropTypes.arrayOf(PropTypes.shape(StatsItem.propTypes.stat))
// };

export default CrmStats;
