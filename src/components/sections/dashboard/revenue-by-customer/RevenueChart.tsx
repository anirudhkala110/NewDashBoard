import { useMemo } from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { SxProps, useTheme } from '@mui/material';
import { fontFamily } from 'theme/typography';
import {
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components';
import ReactEchart from 'components/base/ReactEchart';
import EChartsReactCore from 'echarts-for-react/lib/core';

echarts.use([
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  CanvasRenderer,
]);

interface BarChartProps {
  data: {
    categories: string[];
    series: {
      name: string;
      data: number[];
    }[];
  };
  sx?: SxProps;
  chartRef: React.RefObject<EChartsReactCore>;
}

const RevenueChart = ({ chartRef, data, ...rest }: BarChartProps) => {
  const theme = useTheme();

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        top: 40,
        bottom: 70,
        left: 50,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: data.categories,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: theme.palette.text.secondary,
          fontSize: theme.typography.caption.fontSize,
          fontFamily: fontFamily.monaSans,
          margin: 24,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: theme.palette.text.secondary,
          fontSize: theme.typography.caption.fontSize,
          fontFamily: fontFamily.monaSans,
          formatter: (value: number) => {
            if (value === 0) {
              return '1k';
            } else if (value === 2000) {
              return '2k';
            } else if (value === 4000) {
              return '4k';
            } else if (value === 6000) {
              return '6k';
            } else if (value === 8000) {
              return '8k';
            } else if (value === 10000) {
              return '10K';
            } else {
              return value;
            }
          },
        },
        splitLine: {
          show: false,
        },
        interval: 2000,
        max: 10000,
      },
      series: data.series.map((item, index) => ({
        name: item.name,
        type: 'bar',
        stack: 'total',
        barWidth: 8,
        label: {
          show: false,
        },
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color:
            index === 0
              ? theme.palette.primary.main
              : index === 1
                ? theme.palette.secondary.lighter
                : theme.palette.secondary.main,
        },
        data: item.data,
      })),
    }),
    [theme],
  );

  return <ReactEchart ref={chartRef} echarts={echarts} option={option} {...rest} />;
};

export default RevenueChart;
