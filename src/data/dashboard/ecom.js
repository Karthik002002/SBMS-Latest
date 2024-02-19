import product1 from 'assets/img/products/ecommerce/1.jpg';
import product2 from 'assets/img/products/ecommerce/2.jpg';
import product3 from 'assets/img/products/ecommerce/3.jpg';
import product4 from 'assets/img/products/ecommerce/4.jpg';
import product5 from 'assets/img/products/ecommerce/5.jpg';
import product6 from 'assets/img/products/ecommerce/6.jpg';
import product7 from 'assets/img/products/ecommerce/7.jpg';

export const notifications = [
  {
    id: 1,
    title: '<strong>5 products</strong> didn’t publish to your Facebook page',
    linkFor: 'products',
    type: 'warning'
  },
  {
    id: 2,
    title: '<strong>7 orders</strong> have payments that need to be captured',
    linkFor: 'payments'
  },
  {
    id: 3,
    title: '<strong>50+ orders</strong> need to be fulfilled',
    linkFor: 'orders'
  }
];

export const saleItems = [
  {
    title: 'Orders',
    amount: '15,450',
    subAmount: '13,675',
    type: 'standard',
    percent: 21.8,
    className: 'border-200 border-bottom border-end pb-4'
  },
  {
    title: 'Items sold',
    amount: '1,054',
    subAmount: '13,675',
    type: 'warning',
    percent: 21.8,
    className: 'border-200 border-md-200 border-bottom border-md-end pb-4 ps-3'
  },
  {
    title: 'Refunds',
    amount: '$145.65',
    subAmount: '13,675 ',
    type: 'up',
    percent: 21.8,
    className:
      'border-200 border-bottom border-end border-md-end-0 pb-4 pt-4 pt-md-0 ps-md-3'
  },
  {
    title: 'Gross sale',
    amount: '$100.26',
    subAmount: '$109.65 ',
    type: 'down',
    percent: 21.8,
    className:
      'border-200 border-md-200 border-bottom border-md-bottom-0 border-md-end pt-4 pb-md-0 ps-3 ps-md-0'
  },
  {
    title: 'Shipping',
    amount: '$365.53',
    subAmount: '13,675 ',
    type: 'up',
    percent: 21.8,
    className: 'border-200 border-md-bottom-0 border-end pt-4 pb-md-0 ps-md-3'
  },
  {
    title: 'Processing',
    amount: '861',
    subAmount: '13,675 ',
    type: 'pending',
    percent: 21.8,
    className: 'pb-0 pt-4 ps-3'
  }
];

export const totalSale = {
  lastMonth: [50, 80, 60, 80, 65, 90, 130, 90, 30, 40, 30, 70],
  previousYear: [110, 30, 40, 50, 80, 70, 50, 40, 110, 90, 60, 60]
};

export const topProducts = [
  ['product', '2019', '2018'],
  ['Boots4', 43, 85],
  ['Reign Pro', 83, 73],
  ['Slick', 86, 62],
  ['Falcon', 72, 53],
  ['Sparrow', 80, 50],
  ['Hideaway', 50, 70],
  ['Freya', 80, 90]
];

const recentPurchaseTableBadge = [
  { content: '22.55, 69.15', type: 'success' },
  { content: '22, 69', type: 'warning' }
];

const date = new Date();

export const recentPurchaseTableData = [
  {
    id: '0',
    slno: '1',
    buoyId: 'BUOY001',
    batteryVltInt: '12.0',
    batteryVltExt: '11',
    lightSensorData: '11',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '1',
    slno: '2',
    buoyId: 'BUOY002',
    batteryVltInt: '12.6',
    batteryVltExt: '11',
    lightSensorData: '110',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[1],
    createdAt: date.toLocaleString()
  },
  {
    id: '2',
    slno: '3',
    buoyId: 'BUOY003',
    batteryVltInt: '11.0',
    batteryVltExt: '11',
    lightSensorData: '120',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[1],
    createdAt: date.toLocaleString()
  },
  {
    id: '3',
    slno: '4',
    buoyId: 'BUOY004',
    batteryVltInt: '13.5',
    batteryVltExt: '11',
    lightSensorData: '14',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[1],
    createdAt: date.toLocaleString()
  },
  {
    id: '4',
    slno: '5',
    buoyId: 'BUOY005',
    batteryVltInt: '14.0',
    batteryVltExt: '11',
    lightSensorData: '18',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '5',
    slno: '6',
    buoyId: 'BUOY006',
    batteryVltInt: '10.6',
    batteryVltExt: '11',
    lightSensorData: '20',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '6',
    slno: '7',
    buoyId: 'BUOY007',
    batteryVltInt: '11.3',
    batteryVltExt: '11',
    lightSensorData: '112',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '7',
    slno: '8',
    buoyId: 'BUOY008',
    batteryVltInt: '12.5',
    batteryVltExt: '11',
    lightSensorData: '121',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '8',
    slno: '9',
    buoyId: 'BUOY009',
    batteryVltInt: '12.7',
    batteryVltExt: '11',
    lightSensorData: '211',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '9',
    slno: '10',
    buoyId: 'BUOY010',
    batteryVltInt: '10.5',
    batteryVltExt: '11',
    lightSensorData: '151',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '10',
    slno: '11',
    buoyId: 'BUOY011',
    batteryVltInt: '10.0',
    batteryVltExt: '11',
    lightSensorData: '181',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '11',
    slno: '12',
    buoyId: 'BUOY012',
    batteryVltInt: '11.0',
    batteryVltExt: '11',
    lightSensorData: '119',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '12',
    slno: '13',
    buoyId: 'BUOY013',
    batteryVltInt: '13.0',
    batteryVltExt: '11',
    lightSensorData: '30',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '13',
    slno: '14',
    buoyId: 'BUOY014',
    batteryVltInt: '12.9',
    batteryVltExt: '11',
    lightSensorData: '50',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '14',
    slno: '15',
    buoyId: 'BUOY015',
    batteryVltInt: '12.3',
    batteryVltExt: '11',
    lightSensorData: '11',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '15',
    slno: '16',
    buoyId: 'BUOY016',
    batteryVltInt: '12.0',
    batteryVltExt: '11',
    lightSensorData: '11',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '16',
    slno: '17',
    buoyId: 'BUOY017',
    batteryVltInt: '12.2',
    batteryVltExt: '11',
    lightSensorData: '11',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '17',
    slno: '18',
    buoyId: 'BUOY018',
    batteryVltInt: '11.3',
    batteryVltExt: '11',
    lightSensorData: '11',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '18',
    slno: '19',
    buoyId: 'BUOY019',
    batteryVltInt: '12.0',
    batteryVltExt: '11',
    lightSensorData: '11',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '19',
    slno: '20',
    buoyId: 'BUOY020',
    batteryVltInt: '13.8',
    batteryVltExt: '11',
    lightSensorData: '11',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '20',
    slno: '21',
    buoyId: 'BUOY021',
    batteryVltInt: '10.3',
    batteryVltExt: '11',
    lightSensorData: '11',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  },
  {
    id: '21',
    slno: '22',
    buoyId: 'BUOY022',
    batteryVltInt: '11.9',
    batteryVltExt: '11',
    lightSensorData: '11',
    geoFence: 'Inside',
    location: recentPurchaseTableBadge[0],
    createdAt: date.toLocaleString()
  }
];

export const marketShare = [
  { id: 1, value: 53000000, name: 'Falcon', color: 'primary' },
  { id: 2, value: 19000000, name: 'Sparrow', color: 'info' },
  { id: 3, value: 20000000, name: 'Phoenix', color: 'warning' }
];

export const totalOrder = [110, 100, 250, 210, 530, 480, 320, 325];

export const shoppingCartItems = [
  {
    id: 1,
    title: 'Initiated',
    amount: 43.6,
    barWidth: 50,
    items: ' Session: <span class ="text-600">6817</span> ',
    variant: 'primary',
    iconColor: 'success',
    icon: 'caret-up'
  },
  {
    id: 2,
    title: 'Abandonment rate',
    amount: 13.11,
    barWidth: 25,
    items: '<span class ="text-600">44</span>  of 61',
    variant: 'danger',
    iconColor: 'danger',
    icon: 'caret-up'
  },
  {
    id: 3,
    title: 'Bounce rate',
    amount: 12.11,
    barWidth: 35,
    items: '<span class ="text-600">8</span>  of 61',
    variant: 'primary',
    iconColor: 'success',
    icon: 'caret-up'
  },
  {
    id: 4,
    title: 'Completion rate',
    amount: 43.6,
    barWidth: 43,
    items: '<span class ="text-600">18</span>  of 179',
    variant: 'primary',
    iconColor: 'danger',
    icon: 'caret-down'
  },
  {
    id: 5,
    title: 'Revenue Rate',
    amount: 60.5,
    barWidth: 60,
    items: '<span class ="text-600">18</span>  of 179',
    variant: 'primary',
    iconColor: 'success',
    icon: 'caret-up'
  }
];

export const returningCustomerData = {
  newData: [
    [20, 40, 20, 80, 50, 80, 120, 80, 50, 120, 110, 110],
    [60, 80, 60, 80, 65, 130, 120, 100, 30, 40, 30, 70],
    [100, 70, 80, 50, 120, 100, 130, 140, 90, 100, 40, 50],
    [80, 50, 60, 40, 60, 120, 100, 130, 60, 80, 50, 60],
    [70, 80, 100, 70, 90, 60, 80, 130, 40, 60, 50, 80],
    [90, 40, 80, 80, 100, 140, 100, 130, 90, 60, 70, 50],
    [80, 60, 80, 60, 40, 100, 120, 100, 30, 40, 30, 70],
    [20, 40, 20, 50, 70, 60, 110, 80, 90, 30, 50, 50],
    [60, 70, 30, 40, 80, 140, 80, 140, 120, 130, 100, 110],
    [90, 90, 40, 60, 40, 110, 90, 110, 60, 80, 60, 70],
    [50, 80, 50, 80, 50, 80, 120, 80, 50, 120, 110, 110],
    [60, 90, 60, 70, 40, 70, 100, 140, 30, 40, 30, 70]
  ],
  returningData: [
    [60, 80, 60, 80, 65, 130, 120, 100, 30, 40, 30, 70],
    [100, 70, 80, 50, 120, 100, 130, 140, 90, 100, 40, 50],
    [80, 50, 60, 40, 60, 120, 100, 130, 60, 80, 50, 60],
    [70, 80, 100, 70, 90, 60, 80, 130, 40, 60, 50, 80],
    [90, 40, 80, 80, 100, 140, 100, 130, 90, 60, 70, 50],
    [80, 60, 80, 60, 40, 100, 120, 100, 30, 40, 30, 70],
    [20, 40, 20, 50, 70, 60, 110, 80, 90, 30, 50, 50],
    [60, 70, 30, 40, 80, 140, 80, 140, 120, 130, 100, 110],
    [90, 90, 40, 60, 40, 110, 90, 110, 60, 80, 60, 70],
    [50, 80, 50, 80, 50, 80, 120, 80, 50, 120, 110, 110],
    [60, 90, 60, 70, 40, 70, 100, 140, 30, 40, 30, 70],
    [20, 40, 20, 80, 50, 80, 120, 80, 50, 120, 110, 110]
  ]
};

export const products = [
  {
    id: 1,
    img: product1,
    title: 'iPad Pro 2020 11',
    type: 'Tablet',
    unit: 19,
    price: 69
  },
  {
    id: 2,
    img: product2,
    title: 'iPhone XS',
    type: 'Smartphone',
    unit: 19,
    price: 69
  },
  {
    id: 3,
    img: product3,
    title: 'Amazfit Pace (Global)',
    type: 'Smartwatch',
    unit: 16,
    price: 34
  },
  {
    id: 4,
    img: product4,
    title: 'Lotto AMF Posh Sports Plus',
    type: 'Shoes',
    unit: 11,
    price: 30
  },
  {
    id: 5,
    img: product5,
    title: 'Casual Long Sleeve Hoodie',
    type: 'Jacket',
    unit: 10,
    price: 24
  },
  {
    id: 6,
    img: product6,
    title: 'Playstation 4 1TB Slim',
    type: 'Tablet',
    unit: 10,
    price: 24
  },

  {
    id: 7,
    img: product7,
    title: 'SUNGAIT Lightweight Sunglass',
    type: 'Jacket',
    unit: 15,
    price: 24
  }
];
