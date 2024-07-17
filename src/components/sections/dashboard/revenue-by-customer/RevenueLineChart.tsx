import React from 'react';
import EChartsReact from 'echarts-for-react';

const RevenueChartLine = ({ chartRef, data }) => {
    const options = {
        title: {
            text: 'Sold Devices by Type',
            left: 'center',
            textStyle: {
                color: 'white'
            },
            padding: [20, 0, 0, 0]
        },
        tooltip: {
            trigger: 'axis', // Use axis trigger for line chart and bar chart
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
        series: data.series.map(seriesData => ({
            name: seriesData.name,
            type: 'line', // Use line type for this chart
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
        />
    );
};

export default RevenueChartLine;
