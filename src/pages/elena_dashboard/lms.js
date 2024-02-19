import {
  faBus,
  faCar,
  faCarSide,
  faShuttleVan
} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { useEffect, useState } from 'react';

// export function Stats() {
//   axios.get('https://sbmsadmin.elenageosys.com/user-management/parents/', {
//     headers: {
//       'Authorization': "token 49deb7cf59acb1ffe4b675584a1617ba9afeca68"
//     }
//   })
//     .then((response) => {
//       console.log(response.data);
//       return 'Hello';
//     }
//     )
//     .catch((err) => {
//       console.log(err);
//       console.log("error")
//       return "error";
//     });

  //  useEffect(() => {
  // axios.get('https://sbms.elenageosys.com/user-management/parents/')
  // .then((response) => {
  //  console.log("resp");
  //  console.log(response);
  // })
  // .catch((err) => {
  //   console.log('error');
  //   console.log(err);
  // })
  //  }, []);
  // };
// };
export const lmsStatistics = [
  {
    id: 0,
    title: 'School Buses',
    amount: 4968,
    amountLastMonth: 4203,
    icon: faBus,
    color: 'primary',
    className:
      'border-md-end border-bottom border-xxl-bottom-0 pb-3 p-xxl-0 ps-md-0'
  },
  {
    id: 1,
    title: 'Parents',
    amount: 0,
    amountLastMonth: 301,
    icon: faCar,
    color: 'info',
    className:
      'border-xxl-end border-bottom border-xxl-0 pb-3 pt-4 pt-md-0 pe-md-0 p-xxl-0'
  },
  {
    id: 2,
    title: 'Students',
    amount: 3712,
    amountLastMonth: 2779,
    icon: faCarSide,
    color: 'success',
    className:
      'border-md-end border-bottom border-md-bottom-0 pb-3 pt-4 p-xxl-0 pb-md-0 ps-md-0'
  },
  {
    id: 3,
    title: 'Vans',
    amount: 1054,
    amountLastMonth: 1201,
    icon: faShuttleVan,
    color: 'warning',
    className: 'pt-4 p-xxl-0 pb-0 pe-md-0'
  }
]
