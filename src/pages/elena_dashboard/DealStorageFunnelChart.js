import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { getColor } from 'helpers/utils';
import React, { useEffect, useState } from 'react';

const DealStorageFunnelChart = () => {
  const [options, setOptions] = useState({
    yAxis: [
      {
        data: ['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'],
        axisLabel: {
          inside: true,
          color: getColor('gray-700'),
          fontWeight: 500,
          fontSize: 11,
          fontFamily: 'poppins'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      {
        data: ['50%', '70%', '76%', '68%', '99%'],
        axisLabel: {
          inside: false,
          color: getColor('primary'),
          fontWeight: 500,
          fontSize: 11,
          fontFamily: 'poppins',
          borderRadius: 5,
          backgroundColor: getColor('soft-primary'),
          padding: [6, 16, 6, 16],
          width: 115
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      }
    ],
    xAxis: {
      type: 'value',
      min: 0,
      max: 35,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      inverse: true,
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    series: [
      {
        type: 'bar',
        showBackground: true,
        barWidth: 25,
        label: {
          show: true,
          formatter: '{c} ',
          position: 'insideLeft'
        },
        backgroundStyle: {
          color: getColor('gray-200'),
          borderRadius: 5
        },
        itemStyle: {
          color: getColor('primary'),
          borderRadius: 5
        },
        data: [7, 10, 13, 19, 19]
      }
    ],
    grid: { right: '65px', left: '0', bottom: '0', top: '0' }
  });

  useEffect(() => {
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    var data = [];
    loggedInUser.user.companies.map(company => {
      var activeVehicles = 0;
      var totalVehicles = 0;
      company.schools.map(school => {
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
      if (activeVehicles)
        data.push({
          company_name: company.company_name,
          active: activeVehicles,
          total: totalVehicles
        });
    });

    let results = data;
    const max = results.reduce((prev, current) =>
      prev.total > current.total ? prev : current
    ).total;

    setOptions({
      yAxis: [
        {
          data: results.map(item => item.company_name),
          axisLabel: {
            inside: true,
            color: getColor('black'),
            fontWeight: 500,
            fontSize: 11,
            fontFamily: 'poppins'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        {
          data: results.map(
            item => ((item.active / item.total) * 100).toFixed(1) + '%'
          ),
          axisLabel: {
            inside: false,
            color: getColor('primary'),
            fontWeight: 500,
            fontSize: 11,
            fontFamily: 'poppins',
            borderRadius: 5,
            backgroundColor: getColor('soft-primary'),
            padding: [6, 16, 6, 16],
            width: 115
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        }
      ],
      xAxis: {
        type: 'value',
        min: 0,
        max: max * 1.25,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        inverse: true,
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          type: 'bar',
          showBackground: true,
          barWidth: 25,
          label: {
            show: true,
            formatter: '{c} ',
            position: 'insideLeft'
          },
          backgroundStyle: {
            color: getColor('gray-200'),
            borderRadius: 5
          },
          itemStyle: {
            color: getColor('primary'),
            borderRadius: 5
          },
          data: [results.map(item => item.active)]
        }
      ],
      grid: { right: '65px', left: '0', bottom: '0', top: '0' }
    });
  }, []);

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={options}
      style={{ height: '10rem' }}
    />
  );
};

export default DealStorageFunnelChart;
