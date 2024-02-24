import FalconComponentCard from 'components/common/FalconComponentCard';
import { useListFilterContext } from 'context/FilterContext';
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
import React, { memo, useEffect, useState } from 'react';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer,
  LegendComponent
]);

const DoughnutRoundedChart = ({ data }) => {
  console.log("render");
  const [totalCount, setTotalCount] = useState(0);
  const { Filter, companyFilter } = useListFilterContext();
  const [statusCount, setStatusCount] = useState({});
  useEffect(()=>{
    console.log("Changed");
  },[data])
  useEffect(() => {
    let count = 0;
    const statusCounts = {
      running: 0,
      ideal: 0,
      stop: 0,
      out_of_network: 0,
      nodata: 0,
      parked: 0,
      towed: 0,
      rash_driving: 0
    };
    if (data && Filter === null && companyFilter === null) {
      data.map(company => {
        count = count + company.total_vehicles;

        statusCounts.running += company.status_counts.running;
        statusCounts.ideal += company.status_counts.idle;
        statusCounts.stop += company.status_counts.stop;
        statusCounts.parked += company.status_counts.parked;
        statusCounts.towed += company.status_counts.towed;
        statusCounts.out_of_network += company.status_counts.out_of_Network;
        statusCounts.nodata += company.status_counts.noData;
        statusCounts.rash_driving += company.status_counts.RashCount;
      });
    }
    setStatusCount(statusCounts);
    setTotalCount(count);
  }, [data, Filter, companyFilter]);
  useEffect(() => {
    if (Filter !== null) {
      const filteredData = data.filter(
        company => company.school_name === Filter
      );
      let count = 0;
      const statusCounts = {
        running: 0,
        ideal: 0,
        stop: 0,
        parked: 0,
        towed: 0,
        out_of_network: 0,
        nodata: 0,
        rash_driving: 0
      };

      filteredData.forEach(company => {
        count += company.total_vehicles;
        statusCounts.running += company.status_counts.running;
        statusCounts.ideal += company.status_counts.idle;
        statusCounts.stop += company.status_counts.stop;
        statusCounts.parked += company.status_counts.parked;
        statusCounts.towed += company.status_counts.towed;
        statusCounts.out_of_network += company.status_counts.out_of_Network;
        statusCounts.nodata += company.status_counts.noData;
        statusCounts.rash_driving += company.status_counts.RashCount;
      });
      setStatusCount(statusCounts);
      setTotalCount(count);
    }
  }, [Filter]);
  useEffect(() => {
    if (companyFilter !== null) {
      const filteredData = data.filter(
        company => company.Company_name === companyFilter
      );
      let count = 0;
      const statusCounts = {
        running: 0,
        ideal: 0,
        stop: 0,
        parked: 0,
        towed: 0,
        out_of_network: 0,
        nodata: 0,
        rash_driving: 0
      };

      filteredData.forEach(company => {
        count += company.total_vehicles;
        statusCounts.running += company.status_counts.running;
        statusCounts.ideal += company.status_counts.idle;
        statusCounts.stop += company.status_counts.stop;
        statusCounts.parked += company.status_counts.parked;
        statusCounts.towed += company.status_counts.towed;
        statusCounts.out_of_network += company.status_counts.out_of_Network;
        statusCounts.nodata += company.status_counts.noData;
        statusCounts.rash_driving += company.status_counts.RashCount;
      });
      setStatusCount(statusCounts);
      setTotalCount(count);
    }
  }, [companyFilter]);

  const chartCode = `function ChartOptions() {
    const chartRef = useRef(null)
    
    const isMobile = window.innerWidth < 992;
    
    const getOption = () => ({
      legend: {
        orient: window.innerWidth < 530 ? 'horizontal' : 'horizontal', // Change the legend orientation
        left: 'left',
        textStyle: {
          color: getColor('gray-600'),
          fontSize: '10px',
        }
      },
      series: [
        {
          type: 'pie',
          radius: window.innerWidth < 530 ? ['30%', '55%'] : ['40%', '65%'],
          center: window.innerWidth < 580 ? ['50%', '58%'] : ['50%', '58%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: getColor('gray-100'),
            borderWidth: 2
          },
  
          label: {
            alignTo: 'center',
            show: !isMobile,
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              time: {
                fontSize: 10,
                color: '#999',
              },
            },
          },
          data: [
            {
              value: ${statusCount.running},
              name: 'Running - ${statusCount.running}',
              itemStyle: {
                color: getColor('success')
              }
            },
            {
              value: ${statusCount.ideal},
              name: 'Idle - ${statusCount.ideal}',
              itemStyle: {
                color: getColor('info')
              }
            },
            {
              value: ${statusCount.stop},
              name: 'Stopped - ${statusCount.stop}',
              itemStyle: {
                color: getColor('danger')
              }
            },
            {
              value: ${statusCount.towed},
              name: 'Towing - ${statusCount.towed}',
              itemStyle: {
                color: getColor('purple')
              }
            },
            
            {
              value: ${statusCount.rash_driving},
              name: 'Rash Driving - ${statusCount.rash_driving}',
              itemStyle: {
                color: getColor('warning')
              }
            },
            {
              value: ${statusCount.out_of_network},
              name: 'No Network - ${statusCount.out_of_network}',
              itemStyle: {
                color: getColor('gray')
              }
            },
            {
              value: ${statusCount.nodata},
              name: 'InActive - ${statusCount.nodata}',
              itemStyle: {
                color: getColor('dark')
              }
            },
            {
              value: ${statusCount.parked},
              name: 'Parked - ${statusCount.parked}',
              itemStyle: {
                color: getColor('primary')
              }
            }
          ]
        },
        // Add a custom label in the center
      {
        type: 'pie',
        radius: ['0%', '30%'],
        center: window.innerWidth < 580 ? ['50%', '58%'] : ['50%', '58%'],
        itemStyle: {
          color: 'transparent',
          borderColor: 'transparent',
        },
        label: {
          show: true,
          position: 'center',
          formatter: '${totalCount}', // The value you want to display
          fontSize: 24, // Adjust the font size as needed
          fontWeight: 'bold', // Add other styling as needed
        },
        data: [{ value: 20}],
      }
      ],
      tooltip: {
        trigger: 'item',
        padding: [10, 10],
        backgroundColor: getColor('gray-100'),
        borderColor: getColor('gray-300'),
        textStyle: { color: getColor('dark') },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        },
          formatter: function(params) {
            // Use the name of the data item as the content of the tooltip
            return params.name;
          }
      }
      });
  
      //------- Responsive on window resize -------
      
      const updateDimensions = () => {
        if (window.innerWidth < 530) {
          chartRef.current.getEchartsInstance().setOption({
            series: [
              {
                center: ['65%', '55%']
              }
            ]
          });
        } 
        else
          chartRef.current.getEchartsInstance().setOption({
            series: [
              {
                center: ['50%', '55%']
              }
            ]
          });
      }
    
      // useEffect(() => {
      //   window.addEventListener('resize', updateDimensions);
      //   return () => window.removeEventListener('resize', updateDimensions);
      // }, []);
  
      return (
        <ReactEChartsCore
          echarts={echarts}
          option={getOption()}
          ref={chartRef}
          style={{
            height: window.innerWidth < 530 ? '30rem' : '25rem' 
          }
        }
        />
      );
    }
  `;
  return (
    <div className="p-0">
      <FalconComponentCard dir="ltr" className="h-10">
        <FalconComponentCard.Header
          title={`Total Vehicle Status - ${totalCount}`}
          light={false}
          // className="pt-4"
        />
        <FalconComponentCard.Body
          className="pb-0"
          code={chartCode}
          language="jsx"
          scope={{
            ReactEChartsCore,
            echarts,
            getColor
          }}
        />
      </FalconComponentCard>
    </div>
  );
};

export default memo(DoughnutRoundedChart);
