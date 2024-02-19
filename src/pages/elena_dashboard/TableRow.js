/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
import Flex from 'components/common/Flex';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableRow = ({ data }) => {
  // const { icon, label, value, color, progress, progressValue } = data;
  // const { id, company_name, vehicle_count } = data;
  return (
    <tr>
      <td className="py-3">
        <Flex alignItems="center">
          {/* <img src={icon} alt={label} width={16} /> */}
          <h6 className="text-600 mb-0 ms-2">{data.name}</h6>
        </Flex>
      </td>
      <td className="py-3">
        <Flex alignItems="center">
          {/* <FontAwesomeIcon
            icon="circle"
            className={`text-${color} fs--2 me-2`}
          /> */}
          <h6 className="text-700 fw-normal mb-0">{data.value}</h6>
        </Flex>
      </td>
      {/* <td className="py-3">
        <Flex alignItems="center" justifyContent="end">
          <FontAwesomeIcon
            icon={progress ? 'caret-up' : 'caret-down'}
            className={progress ? 'text-success' : 'text-danger'}
          />
          <h6 className="fs--2 text-700 mb-0 ms-2">{vehicle_count}</h6>
        </Flex>
      </td> */}
    </tr>
  );
};

// TableRow.propTypes = {
//   data: PropTypes.shape({
//     icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
//     label: PropTypes.string.isRequired,
//     value: PropTypes.string.isRequired,
//     progress: PropTypes.bool.isRequired,
//     color: PropTypes.string.isRequired,
//     progressValue: PropTypes.string.isRequired
//   }).isRequired
// };

// TableRow.PropTypes = {
//   data: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     company_name: PropTypes.string.isRequired,
//     vehicle_count: PropTypes.number.isRequired
//   }).isRequired
// };

export default TableRow;
