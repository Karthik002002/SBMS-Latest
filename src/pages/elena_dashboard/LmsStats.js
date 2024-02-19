import React from 'react';
// import PropTypes from 'prop-types';
import { Card, Row } from 'react-bootstrap';
import LmsStatItem from './LmsStatItem';
import {
  faBus,
  faSchool,
  faBookReader,
  faChild
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const LmsStats = () => {
  const [bus, setBus] = useState({});
  const [parent, setParent] = useState({});
  const [student, setStudent] = useState({});
  const [school, setSchool] = useState({});

  useEffect(() => {
    // var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // var activeVehicles = 0;
    // var totalVehicles = 0;
    // var newUsers = 0;

    // loggedInUser.user.companies.map(company => {
    //   if ((Date.now() - new Date(company.user.date_joined)) / 3600000 < 30)
    //     newUsers++;
    //   company.schools.map(school => {
    //     if ((Date.now() - new Date(school.user.date_joined)) / 3600000 < 30)
    //       newUsers++;
    //     school.parents.map(parent => {
    //       if ((Date.now() - new Date(parent.user.date_joined)) / 3600000 < 30)
    //         newUsers++;
    //     });
    //     totalVehicles = totalVehicles + school.vehicles.length;
    //     school.vehicles.map(vehicle => {
    //       if (
    //         vehicle.device &&
    //         vehicle.device.record &&
    //         vehicle.device.record.ignition === true
    //       )
    //         activeVehicles++;
    //     });
    //   });
    // });

    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    fetch(
      'https://sbmsadmin.elenageosys.com/vehicle-management/vehicles/count/',
      {
        headers: {
          Authorization: 'token ' + loggedInUser.token
        }
      }
    )
      .then(response => response.json())
      .then(data => setBus(data))
      .catch(err => console.log(err));

    fetch('https://sbms.elenageosys.com/user-management/parents/count/', {
      headers: {
        Authorization: 'token ' + loggedInUser.token
      }
    })
      .then(response => response.json())
      .then(data => setParent(data))
      .catch(err => console.log(err));

    fetch('https://sbms.elenageosys.com/user-management/students/count/', {
      headers: {
        Authorization: 'token ' + loggedInUser.token
      }
    })
      .then(response => response.json())
      .then(data => setStudent(data))
      .catch(err => console.log(err));

    fetch('https://sbms.elenageosys.com/user-management/schools/count/', {
      headers: {
        Authorization: 'token ' + loggedInUser.token
      }
    })
      .then(response => response.json())
      .then(data => setSchool(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Card>
      <Card.Body className="px-xxl-0 pt-4">
        <Row className="g-0">
          <LmsStatItem
            stat={{
              id: 0,
              title: 'School Buses',
              amount: bus.count,
              amountLastMonth: bus.l_m,
              icon: faBus,
              color: 'primary',
              className: 'border-md-end border-bottom-0 pb-3 p-xxl-0 ps-md-0'
            }}
          />
          <LmsStatItem
            stat={{
              id: 1,
              title: 'Parents',
              amount: parent.count,
              amountLastMonth: parent.l_m,
              icon: faChild,
              color: 'info',
              className:
                'border-bottom-0 border-xxl-0 pb-3 pt-4 pt-md-0 pe-md-0 p-xxl-0'
            }}
          />
          <LmsStatItem
            stat={{
              id: 2,
              title: 'Students',
              amount: student.count,
              amountLastMonth: student.l_m,
              icon: faBookReader,
              color: 'success',
              className:
                'border-md-end border-bottom-0 pb-3 pt-4 p-xxl-0 pb-md-0 ps-md-0'
            }}
          />
          <LmsStatItem
            stat={{
              id: 3,
              title: 'Registered Schools',
              amount: school.count,
              amountLastMonth: school.l_m,
              icon: faSchool,
              color: 'warning',
              className: 'pt-4 p-xxl-0 pb-0 pe-md-0'
            }}
          />
        </Row>
      </Card.Body>
    </Card>
  );
};

LmsStats.propTypes = {
  // data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LmsStats;
