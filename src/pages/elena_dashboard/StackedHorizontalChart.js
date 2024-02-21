import FalconComponentCard from 'components/common/FalconComponentCard';
import { useListFilterContext } from 'context/FilterContext';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { tooltipFormatter } from 'helpers/echart-utils';
import { getColor } from 'helpers/utils';
import React, { useEffect, useState } from 'react';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LegendComponent
]);

const StackedHorizontalChart = ({ data }) => {
  const { Filter, companyFilter } = useListFilterContext();
  const [ChartData, setChartData] = useState(data);
  const [statusCount, setStatusCount] = useState([]);
  const [IndexValue, setIndexValue] = useState([]);
  const [totalCount, setTotalCout] = useState(0);
  const [ResetData, setResetData] = useState(data);
  useEffect(() => {
    let count = 0;
    let ChartDataFormatted = [];
    if (ChartData && Filter === null) {
      ChartDataFormatted = ChartData.map(company => {
        const statusCounts = {
          Comp_name: null,
          running: 0,
          idle: 0,
          stop: 0,
          out_of_network: 0,
          nodata: 0,
          parked: 0,
          towed: 0,
          rash_driving: 0,
          total: 0
        };
        count += company.company_status_counts.total;
        statusCounts.total = company.company_status_counts.total;
        statusCounts.Comp_name = company.Company_name;
        statusCounts.running += company.company_status_counts.running;
        statusCounts.ideal += company.company_status_counts.idle;
        statusCounts.stop += company.company_status_counts.stop;
        statusCounts.parked += company.company_status_counts.parked;
        statusCounts.towed += company.company_status_counts.towed;
        statusCounts.out_of_network +=
          company.company_status_counts.out_of_network;
        statusCounts.nodata += company.company_status_counts.nodata;
        statusCounts.rash_driving += company.company_status_counts.rash_driving;

        return { statusCounts };
      });
    }
    setChartData(data);
    setStatusCount(ChartDataFormatted);
    setTotalCout(count);
  }, [data]);

  useEffect(() => {
    let count = 0;
    let ChartDataFormatted = [];
    if (ChartData && Filter === null && companyFilter === null) {
      ChartDataFormatted = ChartData.map(company => {
        const statusCounts = {
          Comp_name: null,
          running: 0,
          idle: 0,
          stop: 0,
          out_of_network: 0,
          nodata: 0,
          parked: 0,
          towed: 0,
          rash_driving: 0,
          total: 0
        };
        count += company.company_status_counts.total;
        statusCounts.total = company.company_status_counts.total;
        statusCounts.Comp_name = company.Company_name;
        statusCounts.running += company.company_status_counts.running;
        statusCounts.idle += company.company_status_counts.idle;
        statusCounts.stop += company.company_status_counts.stop;
        statusCounts.parked += company.company_status_counts.parked;
        statusCounts.towed += company.company_status_counts.towed;
        statusCounts.out_of_network +=
          company.company_status_counts.out_of_network;
        statusCounts.nodata += company.company_status_counts.nodata;
        statusCounts.rash_driving += company.company_status_counts.rash_driving;

        return { statusCounts };
      });
      setStatusCount(ChartDataFormatted);
    }

    setTotalCout(count);
  }, [ChartData, Filter, companyFilter]);

  useEffect(() => {
    if (Filter !== null) {
      let SchoolFormattedData = [];
      let count = 0;
      const filteredSchools = data.flatMap(company => {
        return company.schools.filter(school => {
          return school.school_name === Filter;
        });
      });

      SchoolFormattedData = filteredSchools.map(school => {
        const statusCounts = {
          Comp_name: null,
          running: 0,
          idle: 0,
          stop: 0,
          out_of_network: 0,
          nodata: 0,
          parked: 0,
          towed: 0,
          rash_driving: 0,
          total: 0
        };
        count += school.total_vehicles;
        statusCounts.total = school.total_vehicles;
        statusCounts.Comp_name = school.school_name;
        statusCounts.running += school.status_counts.running;
        statusCounts.idle += school.status_counts.idle;
        statusCounts.stop += school.status_counts.stop;
        statusCounts.parked += school.status_counts.parked;
        statusCounts.towed += school.status_counts.towed;
        statusCounts.out_of_network += school.status_counts.out_of_Network;
        statusCounts.nodata += school.status_counts.noData;
        statusCounts.rash_driving += school.status_counts.RashCount;
        return { statusCounts };
      });

      setTotalCout(count);
      setStatusCount(SchoolFormattedData);
    }
  }, [Filter]);

  useEffect(() => {
    if (companyFilter !== null) {
      let CompanyFormattedData = [];
      let count = 0;
      const FilteredCompany = data.filter(
        company => company.Company_name === companyFilter
      );
      CompanyFormattedData = FilteredCompany.flatMap(company => {
        return company.schools.map(school => {
          const statusCounts = {
            Comp_name: null,
            running: 0,
            idle: 0,
            stop: 0,
            out_of_network: 0,
            nodata: 0,
            parked: 0,
            towed: 0,
            rash_driving: 0,
            total: 0
          };
          count += school.total_vehicles;
          statusCounts.total = school.total_vehicles;
          statusCounts.Comp_name = school.school_name;
          statusCounts.running += school.status_counts.running;
          statusCounts.idle += school.status_counts.idle;
          statusCounts.stop += school.status_counts.stop;
          statusCounts.parked += school.status_counts.parked;
          statusCounts.towed += school.status_counts.towed;
          statusCounts.out_of_network += school.status_counts.out_of_Network;
          statusCounts.nodata += school.status_counts.noData;
          statusCounts.rash_driving += school.status_counts.RashCount;
          return { statusCounts };
        });
      });
      setTotalCout(count);
      setStatusCount(CompanyFormattedData);
    }
  }, [companyFilter]);

  useEffect(() => {
    GetData();
  }, [statusCount]);

  const GetData = () => {
    const chartIndex = statusCount?.map(
      company =>
        company.statusCounts.Comp_name + '-' + company.statusCounts.total
    );
    setIndexValue(chartIndex);
  };

  const chartCode = `function ChartOptions() {
     const days = ${JSON.stringify(
       statusCount?.map(
         company =>
           `${company.statusCounts.Comp_name} - ${company.statusCounts.total}`
       )
     )};
  
    const getOption = () => ({
      color: [
        getColor('success'),
        getColor('info'),
        getColor('danger'),
        getColor('purple'),
        getColor('warning'),
        getColor('gray'),
        getColor('dark'),
        getColor('primary')
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        padding: [7, 10],
        backgroundColor: getColor('gray-100'),
        borderColor: getColor('gray-300'),
        textStyle: { color: getColor('primary') },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: tooltipFormatter
      },
      toolbox: {
        feature: {
          magicType: {
            type: ['stack', 'tiled']
          }
        },
        right: 0
      },
      legend: {
        data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'],
        textStyle: {
          color: getColor('gray-600')
        },
        left: 0
      },
      xAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: getColor('gray-300')
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: getColor('gray-500')
        },
        splitLine: {
          lineStyle: {
            show: true,
            color: getColor('gray-200')
          }
        }
      },
      yAxis: {
        type: 'category',
        data: days,
        axisLine: {
          lineStyle: {
            show: true,
            color: getColor('gray-300')
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: getColor('gray-500'),
          fontSize: ${window.innerWidth < 530 ? 6 : 10},
          textOverflow: 'ellipsis' 
          // width: '10px'
          // formatter: value => value.substring(0, 3)
        }
      },
      series: [
        {
          name: 'Running',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            color: '#fff'
          },
          emphasis: {
            focus: 'series'
          },
          data: [${statusCount.map(company => company.statusCounts.running)}]
         
        },
        {
          name: 'Idle',
          type: 'bar',
          stack: 'total',
          label: {
            show : true,
            color : '#fff'
            // show:
          },
          emphasis: {
            focus: 'series'
          },
          data: [${statusCount.map(company => company.statusCounts.idle)}]
        },
        {
          name: 'Stopped',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            color: '#fff'
          },
          emphasis: {
            focus: 'series'
          },
          data: [${statusCount.map(company => company.statusCounts.stop)}]
        },
        {
          name: 'Towed',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: { 
            focus: 'series'
          },
          data: [${statusCount.map(company => company.statusCounts.towed)}]
        },
        {
          name: 'Rash Driving',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series'
          },
          data: [${statusCount.map(
            company => company.statusCounts.rash_driving
          )}]
        },
        {
          name: 'No Network',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series'
          },
          data: [${statusCount.map(
            company => company.statusCounts.out_of_network
          )}]
        },
        {
          name: 'InActive',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series'
          },
          data: [${statusCount.map(company => company.statusCounts.nodata)}]
        },
        {
          name: 'Parked',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series'
          },
          data: [${statusCount.map(company => company.statusCounts.parked)}]
        }
      ],
      grid: {
        right: 15,
        left: 5,
        bottom: 5,
        top: '10%',
        containLabel: true
      }
      });
    
      return (
        <ReactEChartsCore
          echarts={echarts}
          option={getOption()}
          style={ {height: window.innerWidth < 530 ? '250px' : '383px'} }
        />
      );
    }
  `;

  return (
    <div className="p-0">
      <FalconComponentCard className="h-10">
        <FalconComponentCard.Header
          title={
            Filter !== null
              ? `${Filter} School Status - ${totalCount}`
              : companyFilter !== null
              ? `${companyFilter} Company Status - ${totalCount}`
              : `Companywise Status - ${totalCount}`
          }
          light={false}
          className="ms-1"
          // className="pt-4"
        />
        <FalconComponentCard.Body
          code={chartCode}
          language="jsx"
          scope={{
            ReactEChartsCore,
            echarts,
            getColor,
            tooltipFormatter
          }}
        />
      </FalconComponentCard>
    </div>
  );
};

export default StackedHorizontalChart;
