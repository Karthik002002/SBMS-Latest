// import { max, min } from 'Math';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { getColor, getRandomNumber, rgbaColor } from 'helpers/utils';
// import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  LegendComponent
]);

const tooltipFormatter = params => {
  return `
    <div>
      <h6 class="fs--1 text-700 mb-0 d-flex align-items-center">
      <div class="dot me-1" style="background-color:${getColor(
        'primary'
      )}"></div>
        Users : ${params[0].value}
        </h6>
    </div>
    `;
};

// eslint-disable-next-line react/prop-types
const RealTimeUsersChart = ({ setUserCount }) => {
  const chartRef = useRef(null);

  var data = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  var axisData = Array.from(Array(25).keys());
  const [maxData, setMaxData] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://sbmslive.elenageosys.com/subscribers')
        .then(res => res.text())
        .then(resp => {
          let num_data = Number(resp);
          // console.log('current num (fetch)', num_data);

          setUserCount(num_data);

          axisData.shift();
          axisData.push(getRandomNumber(100, 500));
          data.shift();
          data.push(num_data);

          let temp = Math.max(...data);
          // console.log('max data', temp);
          setMaxData(temp);
        })
        .catch(err => {
          console.error(err);
          toast.error('Server Not Reachable');
        });

      chartRef.current.getEchartsInstance().setOption({
        xAxis: { data: axisData },
        series: [{ data }]
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ReactEChartsCore
      ref={chartRef}
      echarts={echarts}
      option={{
        tooltip: {
          trigger: 'axis',
          padding: [7, 10],
          axisPointer: { type: 'none' },
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          borderWidth: 1,
          transitionDuration: 0,
          formatter: tooltipFormatter
        },
        xAxis: {
          type: 'category',

          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          boundaryGap: [0.2, 0.2],
          data: axisData
        },
        yAxis: {
          type: 'value',
          scale: true,
          boundaryGap: false,
          axisLabel: { show: false },
          splitLine: { show: false },
          min: 0,
          max: maxData
        },
        series: [
          {
            type: 'bar',
            barCategoryGap: '12%',
            data,
            itemStyle: { color: rgbaColor('#fff', 0.3) }
          }
        ],
        grid: { right: '0px', left: '0px', bottom: 0, top: 0 }
      }}
      style={{ height: '9.375rem' }}
    />
  );
};

// RealTimeUsersChart.propTypes = {};

export default RealTimeUsersChart;
