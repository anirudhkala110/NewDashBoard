import { useState } from 'react';
import Stack from '@mui/material/Stack';
import EChartsReactCore from 'echarts-for-react/lib/core';
import RevenueChartLegend from './RevenueChartLegend';

interface LegendsProps {
  chartRef: React.RefObject<EChartsReactCore>;
  sm?: boolean; // check smaller screen or not
}

const legendsData = [
  {
    id: 1,
    type: 'Type 1',
    color: '#5976D2', // Define colors for each legend item
  },
  {
    id: 2,
    type: 'Type 2',
    color: '#9FE080',
  },
  {
    id: 3,
    type: 'Type 3',
    color: '#FAD85E',
  },
];

const RevenueChartLegends = ({ chartRef, sm }: LegendsProps) => {
  const [toggleState, setToggleState] = useState({
    type1: true,
    type2: true,
    type3: true,
  });

  const handleLegendToggle = (seriesName: string) => {
    const echartsInstance = chartRef.current?.getEchartsInstance();
    if (!echartsInstance) return;

    switch (seriesName) {
      case 'Type 1':
        setToggleState({ ...toggleState, type1: !toggleState.type1 });
        break;
      case 'Type 2':
        setToggleState({ ...toggleState, type2: !toggleState.type2 });
        break;
      case 'Type 3':
        setToggleState({ ...toggleState, type3: !toggleState.type3 });
        break;
      default:
        break;
    }

    // Update chart series based on toggled state
    const option = echartsInstance.getOption() as echarts.EChartsOption;
    if (Array.isArray(option.series)) {
      const updatedSeries = option.series.map((s) => {
        if (s.name === seriesName && s.type === 'bar') {
          const isBarVisible = (s.data as number[]).some((value) => value !== 0);
          return {
            ...s,
            data: isBarVisible
              ? (s.data as number[]).map(() => 0)
              : revenueData.series.find((item) => item.name === seriesName)?.data || [],
          };
        }
        return s;
      });

      echartsInstance.setOption({
        series: updatedSeries,
      });
    }
  };

  return (
    <Stack
      alignItems="center"
      justifyContent={sm ? 'center' : 'flex-start'}
      spacing={2}
      pt={sm ? 3 : 0}
      width={sm ? 1 : 'auto'}
    >
      {legendsData.map((item) => (
        <RevenueChartLegend
          key={item.id}
          data={item}
          isActive={toggleState[`type${item.id}`]}
          handleLegendToggle={handleLegendToggle}
        />
      ))}
    </Stack>
  );
};

export default RevenueChartLegends;
