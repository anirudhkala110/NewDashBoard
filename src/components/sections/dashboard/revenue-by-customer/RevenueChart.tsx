import React, { useState } from 'react';
import EChartsReact from 'echarts-for-react';

const RevenueChart = ({ chartRef, data, onClickBar }) => {
  const [chartType, setChartType] = useState('bar'); // Default to bar chart

  const handleChartClick = (params: { componentType: string; seriesType: string; name: any; }) => {
    // Check if the click happened on a bar
    if (params.componentType === 'series' && params.seriesType === 'bar') {
      setChartType('line')
      onClickBar(params.name); // Pass the clicked month to the parent component
    }
    else {
      setChartType('bar')
      onClickBar(params.name); // Pass the clicked month to the parent component
    }
  };

  const options = {
    title: {
      text: '',
      left: 'center',
      textStyle: {
        color: 'white'
      },
      padding: [20, 0, 0, 0]
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'top',
      top: 'top',
      textStyle: {
        color: 'white'
      },
      itemGap: 20
    },
    grid: {
      top: '20%',
      bottom: '10%'
    },
    xAxis: {
      type: 'category',
      data: data.categories,
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      },
      axisLabel: {
        color: 'white'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      },
      axisLabel: {
        color: 'white'
      }
    },
    series: data.series.map((seriesData: { name: any; data: any; }) => ({
      name: seriesData.name,
      type: chartType,
      stack: 'total', // Stack bars of the same type
      data: seriesData.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }))
  };

  return (
    <EChartsReact
      ref={chartRef}
      option={options}
      style={{ height: '400px', width: '100%' }}
      onEvents={{ click: handleChartClick }} // Handle click event on the chart
    />
  );
};

export default RevenueChart;
