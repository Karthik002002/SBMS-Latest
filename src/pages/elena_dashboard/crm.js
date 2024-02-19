import { faCar } from '@fortawesome/free-solid-svg-icons';

export const statsData = [
  {
    id: 1,
    title: 'New Users',
    amount: 1500,
    target: '2500 vs 2683',
    icon: 'users',
    caret: 'caret-up',
    color: 'primary',
    caretColor: 'success',
    data: [220, 230, 150, 175, 200, 170, 70, 160]
  },
  {
    id: 2,
    title: 'Active Vehicles',
    amount: 130,
    target: '1635 vs 863',
    icon: faCar,
    caret: 'caret-up',
    color: 'info',
    caretColor: 'success',
    data: [90, 160, 150, 120, 230, 155, 220, 240]
  },
  {
    id: 3,
    title: 'Inactive Vehicles',
    amount: 50,
    target: '1423 vs 256',
    icon: faCar,
    caret: 'caret-down',
    color: 'danger',
    caretColor: 'danger',
    data: [200, 150, 175, 130, 150, 115, 130, 100]
  }
];
