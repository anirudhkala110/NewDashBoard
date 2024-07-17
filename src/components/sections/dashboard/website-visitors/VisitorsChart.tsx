import React from 'react';
import EChartsReact from 'echarts-for-react';
import { Margin } from '@mui/icons-material';

const VisitorsChart = ({ chartRef, deviceData }) => {
  const processData = () => {
    // Process the data to get counts of each device type
    const typeCounts = deviceData.reduce((acc, device) => {
      acc[device.type] = (acc[device.type] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(typeCounts).map(type => ({
      name: `Device Type ${parseInt(type) + 1}`,
      value: typeCounts[type],
    }));
  };

  const chartData = processData();

  const options = {
    title: {
      text: '',
      left: 'center',
      textStyle: {
        color: 'white'
      },
      margin: [40, 10, 10, 40] // Adjust top padding
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
      top: 'top', // Adjust legend position
      textStyle: {
        color: 'white'
      },
      itemGap: 15, // Adjust spacing between legend items
    },
    grid: {
      top: '20%', // Adjust the top position of the grid
      bottom: '10%' // Adjust the bottom position of the grid
    },
    series: [
      {
        name: 'Devices',
        type: 'pie',
        radius: '50%',
        data: chartData,
        label: {
          color: 'white'
        },
        labelLine: {
          lineStyle: {
            color: 'white'
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(10, 10, 10, 0.8)'
          }
        }
      }
    ]
  };

  return (
    <div>
      <EChartsReact
        ref={chartRef}
        option={options}
        style={{ height: '300px', width: '100%', border: '', display: '' }}
      />
    </div>
  );
};

export default VisitorsChart;
