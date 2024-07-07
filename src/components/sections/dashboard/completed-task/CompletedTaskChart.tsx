import { SxProps, useTheme } from '@mui/material';
import { fontFamily } from 'theme/typography';
import { useMemo } from 'react';
import { graphic } from 'echarts';
import * as echarts from 'echarts/core';
import ReactEchart from 'components/base/ReactEchart';

interface CompletedTaskChartProps {
  sx?: SxProps;
}

const CompletedTaskChart = ({ ...rest }: CompletedTaskChartProps) => {
  const theme = useTheme();

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none',
        },
      },
      grid: {
        top: 30,
        bottom: 70,
        left: 30,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: ['Jun 1', 'Jun 8', 'Jun 16', 'Jun 24', 'Jun 31', 'July 1', 'July 8', 'July 16', 'July 24'],
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          margin: 10,
          color: theme.palette.text.secondary,
          fontSize: theme.typography.caption.fontSize,
          fontFamily: fontFamily.monaSans,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: theme.palette.text.secondary,
          fontSize: theme.typography.caption.fontSize,
          fontFamily: fontFamily.monaSans,
        },
        splitLine: {
          show: false,
        },
        interval: 100,
        max: 300,
      },
      series: [
        {
          data: [0, 130, 130, 30, 90, 220, 180, 240, 190],
          type: 'line',
          showSymbol: false,
          lineStyle: {
            color: theme.palette.secondary.main,
            width: 1.2,
          },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0, 194, 255, 0.2)',
              },
              {
                offset: 1,
                color: 'rgba(0, 194, 255, 0)',
              },
            ]),
          },
        },
      ],
    }),
    [theme],
  );

  return <ReactEchart echarts={echarts} option={option} {...rest} />;
};

export default CompletedTaskChart;
