/* eslint-disable react/prop-types */
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { PieChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { getColor } from 'helpers/utils';
import React from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer,
  LegendComponent
]);

const SessionByBrowserChart = ({ chartdata }) => {
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={{
        color: [getColor('primary'), getColor('success'), getColor('info')],
        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          borderWidth: 1,
          transitionDuration: 0,
          formatter: params =>
            `<strong>${params.data.name}:</strong> ${params.data.value}%`
        },

        legend: { show: false },
        series: [
          {
            type: 'pie',
            radius: ['100%', '65%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderWidth: 2,
              borderColor: getColor('gray-100')
            },
            label: {
              show: false
            },
            emphasis: {
              scale: false
            },
            chartdata
          }
        ]
      }}
      style={{ height: 300 }}
    />
  );
};

SessionByBrowserChart.propTypes = {
  // chartdata: propTypes.array
};

export default SessionByBrowserChart;
