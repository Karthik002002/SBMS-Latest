import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Card, Table } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';
import Flex from 'components/common/Flex';
import SessionByBrowserChart from './SessionByBrowserChart';
import TableRow from './TableRow';
import { useEffect } from 'react';

const SessionByBrowser = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // fetch('https://sbmsadmin.elenageosys.com/vehicle-management/doughnutchart/', {
    //   headers: {
    //     Authorization: 'token 49deb7cf59acb1ffe4b675584a1617ba9afeca68'
    //   }
    // })
    //   .then(res => res.json())
    //   .then(resp => {
    //     setChartData(resp);
    //     console.log(resp);
    //   })
    //   .catch(err => console.error(err));

    var loggedInUser = JSON.parse(
      window.sessionStorage.getItem('loggedInUser')
    );

    let temp = [];
    if (loggedInUser.user) {
      loggedInUser.user.companies.forEach(comapny => {
        var total_bus = 0;
        comapny.schools.forEach(school => {
          total_bus = total_bus + school.vehicles.length;
        });
        temp.push({ name: comapny.company_name, value: total_bus });
      });
      setChartData(temp);
    }
  }, []);

  return (
    <Card className="h-100">
      <FalconCardHeader
        title="Buoy Count Overview"
        titleTag="h5"
        className="py-2"
        light
      />
      <Card.Body
        as={Flex}
        direction="column"
        justifyContent="between"
        className="py-0"
      >
        <div className="my-auto py-5 py-md-5">
          <SessionByBrowserChart chartdata={chartData} />
        </div>
        <div className="border-top">
          <Table size="sm" className="mb-0">
            <tbody>
              {chartData.map((data, i) => (
                <TableRow key={i} data={data} />
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>

      <Card.Footer className="bg-light py-2"></Card.Footer>
    </Card>
  );
};

// SessionByBrowser.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape(TableRow.propTypes.data)).isRequired
// };

export default SessionByBrowser;
